---
title: "Windows 更新后微软拼音反复恢复的处理方法"
description: "Windows 更新后微软拼音反复被添加？本文介绍关闭语言首选项同步、手动删除输入法，并通过 PowerShell 在登录时自动检查和清理微软拼音的方法。"
pubDate: 2026-07-25
updatedDate: 2026-07-26

tags:
  - Windows 11
  - 微软拼音
  - 输入法
  - PowerShell
  - Windows 教程
draft: false
---

我平时使用搜狗拼音，不需要微软拼音，所以一直在 Windows 的语言设置中将它删除。

问题是，每隔一段时间，尤其是在 Windows 完成较大的系统更新后，微软拼音可能会被重新添加。任务栏输入法列表中再次出现微软拼音，每次都需要进入设置手动删除。

单纯删除一次并不一定能够长期解决。为了减少它反复出现带来的影响，我目前采用以下处理方式：

1. 关闭 Windows 的语言首选项同步；
2. 手动删除一次微软拼音；
3. 添加一个登录时自动检查的 PowerShell 脚本。

这样做并不是阻止 Windows 修改输入法配置，而是在微软拼音再次出现后，通过脚本自动将它从当前用户的输入法列表中移除。

> 本文以 Windows 11 为例。不同版本的 Windows 可能会调整设置页面的名称和位置。脚本只处理当前 Windows 用户，不会删除简体中文语言包，也不会主动删除搜狗拼音、微信输入法等其他输入法。

## 一、确认已经安装其他中文输入法

删除微软拼音前，先确认搜狗拼音、微信输入法或其他中文输入法已经安装，并且可以正常使用。

进入以下位置：

```text
设置
→ 时间和语言
→ 语言和区域
→ 中文（简体，中国）
→ 语言选项
→ 键盘
```

正常情况下，可以在这里看到当前安装的输入法。

如果当前只有微软拼音，建议先安装并测试其他中文输入法。否则删除微软拼音后，可能会暂时无法输入中文。

## 二、关闭 Windows 语言首选项同步

Windows 可以通过 Microsoft 账户备份和同步部分系统设置，其中包括语言首选项。

为了减少旧的语言和输入法配置通过 Microsoft 账户重新同步到本机，可以先关闭这一项。

进入：

```text
设置
→ 账户
→ Windows 备份
→ 记住我的首选项
→ 关闭“语言首选项”
```

这里只需要关闭“语言首选项”，不必关闭整个 Windows 备份功能。

这一步主要用于排除 Microsoft 账户同步造成的影响，不能保证阻止 Windows 更新重新添加微软拼音。后面的自动清理脚本仍然是主要处理措施。

如果电脑没有登录 Microsoft 账户，或者从未开启设置同步，这一步可能不会产生明显变化。

## 三、手动删除一次微软拼音

进入：

```text
设置
→ 时间和语言
→ 语言和区域
→ 中文（简体，中国）
→ 语言选项
```

在“键盘”区域找到“微软拼音”，单击右侧的三个点，然后选择“删除”。

删除完成后，检查任务栏输入法列表，确认其中只剩下自己需要的输入法。

如果后续 Windows 更新不再添加微软拼音，到这里就已经解决了。假如它仍然会回来，可以继续设置自动清理脚本。

## 四、使用 PowerShell 自动清理微软拼音

Windows 会为键盘布局和输入法分配对应的 TIP 标识。简体中文微软拼音的标识是：

```text
0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}
```

下面的安装代码会完成以下操作：

- 在 `%LocalAppData%` 中创建自动清理脚本；
- 将脚本注册到当前用户的登录启动项；
- 登录启动后额外等待 15 秒，再检查输入法列表；
- 只删除微软拼音对应的 TIP 标识；
- 保留其他已经配置的输入法；
- 如果微软拼音是某种语言下的唯一输入法，则跳过删除；
- 执行失败时，将错误写入日志文件。

右键单击开始菜单，打开“终端”或“Windows PowerShell”。

确认当前终端使用的是 PowerShell，而不是命令提示符。此操作修改的是当前用户配置，通常不需要管理员权限。

复制并执行下面的完整代码：

```powershell
$scriptDirectory = Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin'
$scriptPath = Join-Path $scriptDirectory 'Remove-MicrosoftPinyin.ps1'

New-Item `
    -ItemType Directory `
    -Path $scriptDirectory `
    -Force | Out-Null

$scriptContent = @'
param(
    [int]$DelaySeconds = 0
)

if ($DelaySeconds -gt 0) {
    Start-Sleep -Seconds $DelaySeconds
}

$MicrosoftPinyin = '0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}'

try {
    $languageList = Get-WinUserLanguageList -ErrorAction Stop
    $changed = $false

    foreach ($language in $languageList) {
        $inputMethods = @($language.InputMethodTips)

        if ($inputMethods -notcontains $MicrosoftPinyin) {
            continue
        }

        $remainingInputMethods = @(
            $inputMethods | Where-Object {
                $_ -ne $MicrosoftPinyin
            }
        )

        if ($remainingInputMethods.Count -eq 0) {
            continue
        }

        [void]$language.InputMethodTips.Remove($MicrosoftPinyin)
        $changed = $true
    }

    if ($changed) {
        Set-WinUserLanguageList `
            -LanguageList $languageList `
            -Force `
            -ErrorAction Stop
    }
}
catch {
    $logPath = Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin\error.log'

    "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $($_.Exception.Message)" |
        Add-Content `
            -LiteralPath $logPath `
            -Encoding UTF8
}
'@

Set-Content `
    -LiteralPath $scriptPath `
    -Value $scriptContent `
    -Encoding UTF8

$runCommand = @(
    'powershell.exe'
    '-NoLogo'
    '-NoProfile'
    '-WindowStyle Hidden'
    '-ExecutionPolicy Bypass'
    "-File `"$scriptPath`""
    '-DelaySeconds 15'
) -join ' '

$runKey = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'

New-Item `
    -Path $runKey `
    -Force | Out-Null

New-ItemProperty `
    -Path $runKey `
    -Name 'RemoveMicrosoftPinyin' `
    -PropertyType String `
    -Value $runCommand `
    -Force | Out-Null

powershell.exe `
    -NoLogo `
    -NoProfile `
    -ExecutionPolicy Bypass `
    -File $scriptPath

Write-Host ''
Write-Host '设置完成。'
Write-Host "脚本位置：$scriptPath"
Write-Host '以后每次登录 Windows 时都会自动检查并删除微软拼音。'
```

出现“设置完成”后即可关闭终端。

安装代码会立即运行一次清理脚本，同时在以下注册表位置创建当前用户的登录启动项：

```text
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
```

以后登录 Windows 时，系统会启动这个脚本。PowerShell 启动后还会额外等待 15 秒，再检查输入法配置。

Windows 可能会延迟执行 `Run` 注册表项中的程序，因此实际清理时间不一定正好是登录后的第 15 秒。

脚本使用了：

```text
-WindowStyle Hidden
```

它会尽量以隐藏窗口方式运行。正常情况下不会显示完整的 PowerShell 窗口，但在部分系统环境中，仍有可能出现短暂的窗口闪烁。

代码中的：

```text
-ExecutionPolicy Bypass
```

只对本次启动的 PowerShell 进程生效，不会永久修改当前用户或整台电脑的 PowerShell 执行策略。

## 五、检查是否设置成功

### 检查微软拼音是否已经移除

在 PowerShell 中执行：

```powershell
Get-WinUserLanguageList |
    Format-List LanguageTag, InputMethodTips
```

找到 `zh-CN` 对应的项目，检查其中的 `InputMethodTips`。

如果微软拼音已经成功删除，列表中不应再出现：

```text
0804:{81D4E9C9-1D3B-41BC-9E6C-4B40BF79E35E}{FA550B04-5AD7-411F-A5AC-CA038EC515D7}
```

如果只需要快速查看所有输入法 TIP，也可以执行：

```powershell
(Get-WinUserLanguageList).InputMethodTips
```

### 检查登录启动项

执行：

```powershell
Get-ItemProperty `
    -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' `
    -Name 'RemoveMicrosoftPinyin'
```

如果能够看到 `RemoveMicrosoftPinyin` 及其启动命令，说明自动检查已经注册。

### 检查脚本文件

执行：

```powershell
Get-Item `
    -LiteralPath (Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin\Remove-MicrosoftPinyin.ps1')
```

如果能够显示脚本文件信息，说明脚本已经保存成功。

最后注销一次 Windows 并重新登录，然后确认：

- 搜狗拼音等其他输入法仍然可以正常使用；
- 微软拼音没有出现在任务栏输入法列表中；
- 没有持续显示 PowerShell 窗口；
- 登录一段时间后，启动项仍然存在。

## 六、查看错误日志

如果脚本执行失败，会将错误信息记录到：

```text
%LocalAppData%\RemoveMicrosoftPinyin\error.log
```

可以在 PowerShell 中执行：

```powershell
$logPath = Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin\error.log'

if (Test-Path -LiteralPath $logPath) {
    Get-Content -LiteralPath $logPath
}
else {
    Write-Host '当前没有错误日志。'
}
```

没有生成 `error.log`，通常表示脚本没有捕获到执行错误。

需要注意的是，没有错误日志并不等于微软拼音一定已经删除。最终仍应通过 `Get-WinUserLanguageList` 检查实际输入法列表。

## 七、如何撤销自动清理

以后需要恢复微软拼音时，应当先删除自动清理配置，否则重新添加后可能会在下次登录时再次被移除。

打开 PowerShell，执行：

```powershell
Remove-ItemProperty `
    -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' `
    -Name 'RemoveMicrosoftPinyin' `
    -ErrorAction SilentlyContinue

Remove-Item `
    -LiteralPath (Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin') `
    -Recurse `
    -Force `
    -ErrorAction SilentlyContinue

Write-Host '自动清理配置已删除。'
```

这段代码会删除：

- 当前用户的 `RemoveMicrosoftPinyin` 登录启动项；
- `%LocalAppData%\RemoveMicrosoftPinyin` 文件夹；
- 自动清理脚本和错误日志。

然后进入：

```text
设置
→ 时间和语言
→ 语言和区域
→ 中文（简体，中国）
→ 语言选项
→ 添加键盘
```

重新添加微软拼音即可。

## 八、常见问题

### 执行脚本后微软拼音仍然显示

先关闭正在使用的程序，再注销 Windows 并重新登录。

部分程序和任务栏组件可能会缓存输入法列表。脚本修改完成后，当前界面不一定立即刷新。

重新登录后，可以再次执行：

```powershell
Get-WinUserLanguageList |
    Format-List LanguageTag, InputMethodTips
```

检查微软拼音的 TIP 标识是否仍在当前用户的语言列表中。

如果 TIP 已经不存在，但任务栏仍然显示微软拼音，可以尝试重新启动电脑，排除输入法界面缓存的影响。

### 脚本没有删除微软拼音

脚本不会删除某种语言下的唯一输入法。

这是为了避免当前语言没有任何可用输入法。请先安装并测试搜狗拼音、微信输入法或其他中文输入法，然后重新运行安装代码。

还可以查看错误日志：

```powershell
Get-Content `
    -LiteralPath (Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin\error.log') `
    -ErrorAction SilentlyContinue
```

### 每次登录后多久会执行

启动项由 Windows 在当前用户登录后运行，但系统可能会延迟执行 `Run` 注册表项中的程序。

PowerShell 进程真正启动后，脚本还会额外等待 15 秒。因此，不能将它理解为严格的“登录后第 15 秒执行”。

如果登录后立即打开输入法列表，可能暂时还能看到微软拼音。等待一段时间后再检查即可。

### 是否需要管理员权限

通常不需要。

这套方法修改的是：

- 当前用户的语言列表；
- 当前用户的 `Run` 注册表启动项；
- 当前用户的 `%LocalAppData%` 文件夹。

这些位置通常可以由普通用户修改。

如果电脑由学校、公司或其他组织管理，相关设置可能受到组策略、设备管理策略或登录脚本影响。此时，当前用户的配置可能会被组织策略重新覆盖。

### 会不会删除简体中文语言包

不会。

脚本只从当前用户的输入法列表中移除微软拼音对应的 TIP 标识，不会主动删除：

- 简体中文语言包；
- Windows 中文显示界面；
- 搜狗拼音；
- 微信输入法；
- 其他已经配置的键盘和输入法。

### 会不会影响其他 Windows 用户

不会。

脚本使用的是当前用户注册表路径：

```text
HKEY_CURRENT_USER
```

语言列表也是通过当前用户的 `Get-WinUserLanguageList` 和 `Set-WinUserLanguageList` 修改。

同一台电脑上的其他 Windows 账户不会自动使用这套配置。如果其他账户也存在同样的问题，需要登录对应账户后分别设置。

### 能不能直接删除微软拼音系统文件

不建议。

直接删除 Windows 系统目录中的输入法文件，或者随意修改系统级输入法注册表组件，可能造成：

- 语言设置页面异常；
- 系统文件检查发现损坏；
- Windows 更新失败或重新修复文件；
- 中文输入和语言组件出现其他问题。

相比之下，修改当前用户的输入法列表风险更低，也更容易撤销。

### Windows 更新后脚本会不会消失

脚本保存在当前用户的 `%LocalAppData%` 中，启动项保存在当前用户的注册表中。一般的 Windows 更新通常不会主动删除这些内容。

不过，系统重置、用户配置损坏、清理软件误删文件，或者组织管理策略都可能影响它。

如果更新后自动清理失效，可以重新检查：

```powershell
Get-ItemProperty `
    -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' `
    -Name 'RemoveMicrosoftPinyin' `
    -ErrorAction SilentlyContinue
```

以及：

```powershell
Test-Path `
    -LiteralPath (Join-Path $env:LOCALAPPDATA 'RemoveMicrosoftPinyin\Remove-MicrosoftPinyin.ps1')
```

如果启动项或脚本文件已经不存在，重新执行第四部分的安装代码即可。

## 总结

对于 Windows 更新后微软拼音反复出现的问题，只在设置中手动删除一次可能不够稳定。

我目前采用的处理方式是：

1. 关闭 Windows 的语言首选项同步，排除账户同步影响；
2. 手动删除微软拼音；
3. 登录时通过 PowerShell 自动检查当前用户的输入法列表；
4. 在不影响其他输入法的前提下，移除微软拼音的 TIP 标识。

这套方法不会删除 Windows 中文语言包，也不会直接修改或删除系统输入法文件。

它不能阻止 Windows 更新重新添加微软拼音，但可以在当前用户登录后自动检查并清理，减少反复进入设置手动删除的麻烦。

## 参考资料

- [适用于 Windows 的键盘标识符和输入法编辑器](https://learn.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/windows-language-pack-default-values?view=windows-11)
- [Get-WinUserLanguageList](https://learn.microsoft.com/zh-cn/powershell/module/international/get-winuserlanguagelist)
- [Set-WinUserLanguageList](https://learn.microsoft.com/zh-cn/powershell/module/international/set-winuserlanguagelist)
- [Windows 备份设置目录](https://support.microsoft.com/zh-cn/windows/windows-%E5%A4%87%E4%BB%BD%E8%AE%BE%E7%BD%AE%E7%9B%AE%E5%BD%95-deebcba2-5bc0-4e63-279a-329926955708)
- [运行和 RunOnce 注册表项](https://learn.microsoft.com/zh-cn/windows/win32/setupapi/run-and-runonce-registry-keys)
- [about_PowerShell_exe](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_powershell_exe?view=powershell-5.1)
