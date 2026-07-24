import { projects, type CatalogItem } from './catalog';

export interface DetailItem {
	title: string;
	description: string;
}

export interface ProjectFeatureGroup {
	title: string;
	description?: string;
	items: DetailItem[];
}

export interface ProjectStep {
	title: string;
	description: string;
	command?: string;
}

export interface ProjectRequirement {
	term: string;
	description: string;
}

export interface ProjectDetail {
	slug: string;
	item: CatalogItem;
	pageDescription: string;
	introduction: string[];
	useCases: DetailItem[];
	featureGroups: ProjectFeatureGroup[];
	steps: ProjectStep[];
	requirements: ProjectRequirement[];
	technicalDetails: DetailItem[];
	cautions: string[];
}

function getProject(slug: string): CatalogItem {
	const detailsPath = `/projects/${slug}/`;
	const project = projects.find((item) => item.detailsPath === detailsPath);

	if (!project) {
		throw new Error(`Missing catalog data for project: ${slug}`);
	}

	return project;
}

export const projectDetails: ProjectDetail[] = [
	{
		slug: 'power-settings-manager',
		item: getProject('power-settings-manager'),
		pageDescription:
			'扫描并管理 Windows 10/11 经典高级电源设置的可见性，支持安全确认、启动快照、注册表备份与恢复。',
		introduction: [
			'Windows 高级电源设置管理器面向希望查看或整理经典“电源选项”隐藏项目的 Windows 10/11 用户。它同时读取 powercfg /q 和 PowerSettings 注册表，再按 GUID 合并信息，用中英文名称、分组和当前状态呈现每个设置。',
			'这个项目管理的是设置项在经典高级电源设置窗口中的可见性，不会自动更改交流电或电池模式下的具体参数值。普通扫描保持只读；只有用户选择显示、隐藏或恢复操作，并核对路径、原值和目标值后，受限辅助程序才会请求 UAC 写入 HKLM。',
			'项目把诊断快照与可恢复备份分开处理：每次进程启动后的首次完整扫描会保存全部状态快照，而真正修改前还会单独保存原始注册表值。两者用途不同，恢复时应以注册表备份为准。',
		],
		useCases: [
			{
				title: '查找被隐藏的高级设置',
				description: '按名称、分组、GUID 或显示状态定位经典控制面板中没有出现的电源设置。',
			},
			{
				title: '批量调整设置可见性',
				description: '在逐项查看原值与目标值后，批量显示、隐藏或恢复选中的设置。',
			},
			{
				title: '保留变更与诊断依据',
				description: '通过启动快照、修改前备份、导出文件和日志记录当前状态与操作结果。',
			},
		],
		featureGroups: [
			{
				title: '扫描、管理与恢复',
				items: [
					{
						title: '双来源扫描',
						description: '调用固定系统路径中的 powercfg.exe /q，并读取 64 位 PowerSettings 注册表。',
					},
					{
						title: 'GUID 合并与双语展示',
						description: '按分组 GUID 和设置 GUID 合并数据，显示英文名称、内置中文名称、路径与当前索引。',
					},
					{
						title: '搜索与状态筛选',
						description: '支持按名称、分组、GUID、可见状态和已选择状态快速缩小范围。',
					},
					{
						title: '批量显示、隐藏和恢复',
						description: '对选中项目执行可见性操作，也可以恢复全部由软件记录的已修改设置。',
					},
					{
						title: '启动首次扫描快照',
						description: '每次启动后的第一次完整扫描成功时，自动保存一份不受筛选影响的全量状态快照。',
					},
					{
						title: '修改前注册表备份',
						description: '在 UAC 写入前原子保存 Attributes 原值及是否存在，用作安全恢复依据。',
					},
					{
						title: '多格式导出与导入',
						description: '可导出 JSON、CSV 和 .reg，并验证由本软件生成的 JSON 备份后执行恢复。',
					},
					{
						title: '逐项结果与日志',
						description: '查看完整路径、原值、目标值、成功或失败结果，以及用于排查问题的运行日志。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载并解压',
				description: '从 GitHub Releases 下载 Windows x64 自包含便携 ZIP，解压到当前用户可写的普通文件夹。',
			},
			{
				title: '运行主程序',
				description: '运行 PowerSettingsManager.exe，并保留同目录中的 PowerSettingsManager.ElevatedHelper.exe。',
			},
			{
				title: '扫描电源设置',
				description: '点击扫描，等待 powercfg 与注册表数据完成读取和合并。普通扫描不会请求管理员权限。',
			},
			{
				title: '搜索并筛选',
				description: '使用名称、分组、GUID 和状态筛选定位目标设置，再勾选需要处理的项目。',
			},
			{
				title: '核对变更',
				description: '在确认窗口查看完整注册表路径、扫描前原值和目标值，只继续处理自己理解的项目。',
			},
			{
				title: '确认风险并通过 UAC',
				description: '选择显示、隐藏或恢复操作，确认风险后允许受限辅助程序执行本次 HKLM 写入。',
			},
			{
				title: '检查逐项结果',
				description: '确认每项操作的成功、失败、跳过和写后验证结果；失败项目可结合日志诊断。',
			},
			{
				title: '重新打开系统窗口',
				description: '关闭并重新打开 Windows 高级电源设置窗口，检查可见性变化是否在当前设备上生效。',
			},
			{
				title: '保留数据并安全卸载',
				description: '保留 Data 中的快照、备份和日志。卸载前优先在应用内恢复全部已修改设置，再备份 Data 并删除便携目录。',
			},
		],
		requirements: [
			{
				term: '操作系统',
				description: 'Windows 10 x64 或 Windows 11 x64；当前项目不提供 x86 或 ARM64 构建。',
			},
			{
				term: '运行时',
				description: '当前 GitHub Release 为自包含便携包，无需另装 .NET。自行发布框架依赖版时需要 x64 .NET 8 Desktop Runtime；从源码构建需要 .NET 8 SDK。',
			},
			{
				term: '管理员权限',
				description: '扫描和保存启动快照不需要管理员权限；写入、删除或恢复 HKLM 值时才会触发 UAC。',
			},
			{
				term: '数据目录',
				description: '程序所在目录必须允许当前用户创建并写入 Data 子目录。',
			},
			{
				term: '部署方式',
				description: '当前为便携程序，没有安装器、代码签名或自动更新功能；不建议直接放在 Program Files 中运行。',
			},
		],
		technicalDetails: [
			{
				title: '.NET 8 与 WPF',
				description: '桌面界面、核心模型、基础设施和受限提权辅助程序按职责拆分。',
			},
			{
				title: 'PowerCfg 与注册表合并',
				description: '容错解析中英文 powercfg 输出，并与注册表名称、描述和 Attributes 状态按 GUID 合并。',
			},
			{
				title: '受限提权边界',
				description: '辅助程序不接受任意命令或注册表路径，只根据已经验证的 GUID 生成 PowerSettings 目标路径。',
			},
			{
				title: '便携数据与原子写入',
				description: '快照、注册表备份、日志与配置均保存在程序目录的 Data 下，关键 JSON 使用临时文件与原子替换。',
			},
		],
		cautions: [
			'修改 HKLM 注册表存在系统配置风险，只处理自己理解并已经核对路径与原值的项目。',
			'不要删除或单独移动 PowerSettingsManager.ElevatedHelper.exe，否则显示、隐藏和恢复功能无法工作。',
			'不要随意删除 Data 目录；启动快照不能替代 RegistryBackups 中的注册表恢复记录。',
			'不同 Windows 版本、OEM 定制、电源驱动和 Modern Standby 配置可能使部分设置即使标记为可见也不显示或不生效。',
			'当前发布没有安装器、商业代码签名和自动更新；下载后可使用 Release 附带的 SHA-256 文件校验 ZIP。',
		],
	},
	{
		slug: 'mobile-hotspot-controller',
		item: getProject('mobile-hotspot-controller'),
		pageDescription:
			'控制 Windows 11 移动热点，并在系统能力允许时使用 Wi-Fi Direct 提供仅局域网模式。',
		introduction: [
			'Windows 移动热点控制器是面向 Windows 11 x64 的 WPF 桌面应用。它可以通过 WinRT 控制系统移动热点，也可以在没有互联网共享需求时使用 Wi-Fi Direct Legacy AP 建立仅局域网热点。',
			'当前仓库已经包含主界面、同一可执行文件承载的后台 Agent、系统托盘、开机启动、诊断和三段式热点 Provider 协调逻辑，并提供自包含单文件 Release。它不是只包含概念验证程序的空壳项目。',
			'热点能力最终取决于 Windows 版本、无线网卡和驱动。程序会记录 WinRT、Wi-Fi Direct 与 Hosted Network 的能力和尝试结果，但不会把“系统声明支持”直接等同于“本机一定能成功启动”。',
		],
		useCases: [
			{
				title: '管理系统移动热点',
				description: '配置热点名称与密码，通过 Windows 官方 tethering 能力启动、停止或重新启动互联网共享热点。',
			},
			{
				title: '建立离线局域网',
				description: '在设备支持时使用 Wi-Fi Direct Legacy AP，让附近设备连接到本机进行局域网通信。',
			},
			{
				title: '诊断热点能力',
				description: '查看当前网络、Provider、原始错误码和系统诊断，区分配置问题与硬件或驱动限制。',
			},
		],
		featureGroups: [
			{
				title: '当前版本已经实现',
				items: [
					{
						title: '互联网共享与仅局域网',
						description: '提供 InternetShared 与 LocalOnly 两种模式，并可在官方热点失败时按设置回退。',
					},
					{
						title: '三段式 Provider 协调',
						description: '依次评估 WinRT tethering、Wi-Fi Direct Legacy AP 和受能力检测约束的 Hosted Network。',
					},
					{
						title: 'SSID 与密码校验',
						description: '验证热点名称长度和密码格式，避免把无效配置交给 Windows 系统 API。',
					},
					{
						title: '后台 Agent 与安全 IPC',
						description: '使用当前用户范围的命名管道维持热点状态；Agent 与主界面由同一个单文件程序提供。',
					},
					{
						title: '托盘与启动设置',
						description: '支持系统托盘操作、开机自启、启动时最小化、延迟自动开启和退出行为设置。',
					},
					{
						title: '诊断与结构化日志',
						description: '展示网络、系统与 Provider 状态，支持复制或导出诊断信息，并保留原始系统错误码。',
					},
					{
						title: '敏感信息保护',
						description: '热点密码使用当前用户 DPAPI 单独加密，普通设置与日志不会记录明文密码。',
					},
				],
			},
			{
				title: '设备能力边界',
				description: '以下路径已经在代码中实现，但是否可用必须以当前电脑的网卡与驱动检测结果为准。',
				items: [
					{
						title: 'Wi-Fi Direct Legacy AP',
						description: '用于 LocalOnly 模式，不提供互联网 cross-connectivity；设备发现、DHCP 和双向通信仍受驱动影响。',
					},
					{
						title: 'Hosted Network',
						description: '仅在 Native WLAN 报告可用时启用；开发机上的该能力为 Unavailable，不能据此承诺所有设备可用。',
					},
					{
						title: '连接设备信息',
						description: '界面以系统报告的连接数量为基础，并尽力通过邻居表补充名称、IP 和 MAC 等信息。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载单文件程序',
				description: '从 GitHub Releases 下载 MobileHotspotController.exe。当前发布为 Windows 11 x64 自包含文件。',
			},
			{
				title: '运行并检查环境',
				description: '直接启动程序，先在“系统诊断”中确认网络、无线设备和各 Provider 的检测结果。',
			},
			{
				title: '填写热点配置',
				description: '输入 SSID 与 8–63 个可打印 ASCII 字符组成的密码；密码会使用当前用户 DPAPI 保存。',
			},
			{
				title: '选择启动策略',
				description: '选择“互联网共享优先”或“仅局域网”，并决定官方热点失败时是否允许回退。',
			},
			{
				title: '启动并查看状态',
				description: '点击“打开热点”，观察实际 Provider、运行模式、网络状态和连接设备数量。',
			},
			{
				title: '使用托盘与自动启动',
				description: '按需启用开机自启、启动时最小化、自动开启、重试次数和关闭窗口行为。',
			},
			{
				title: '遇到失败先诊断',
				description: '复制或导出诊断报告，记录 Provider 与原始错误码；不要把关闭防火墙或重置网络作为默认处理方式。',
			},
			{
				title: '退出与移除',
				description: '根据设置决定退出时是否关闭热点。删除程序前先退出托盘进程；用户配置仍保存在 %AppData%\\MobileHotspotController。',
			},
		],
		requirements: [
			{
				term: '操作系统',
				description: 'Windows 11 x64；项目目标平台最低版本为 Windows 11 build 22000。',
			},
			{
				term: '运行时',
				description: 'GitHub Release 是自包含单文件程序，不需要单独安装 .NET。当前源码目标为 .NET 8，并由 global.json 指定 .NET SDK 9.0.306 构建环境。',
			},
			{
				term: '无线硬件',
				description: '需要 Windows 能识别的 Wi-Fi 设备；具体 Provider 是否可用取决于网卡、驱动与系统能力。',
			},
			{
				term: '权限模型',
				description: '主界面和 Agent 设计为普通用户运行；特定系统修复操作能否执行仍由 Windows 权限与服务状态决定。',
			},
			{
				term: '数据位置',
				description: '设置、DPAPI 加密凭据、日志、诊断与备份保存在 %AppData%\\MobileHotspotController。',
			},
		],
		technicalDetails: [
			{
				title: '.NET 8 WPF',
				description: '主应用使用 WPF/MVVM，Release 以 win-x64 自包含单文件方式发布。',
			},
			{
				title: 'Provider 回退协调器',
				description: 'Core 层串行处理启动、停止与重启，Windows 层封装 WinRT、Wi-Fi Direct 和 Native WLAN。',
			},
			{
				title: '同进程文件 Agent 模式',
				description: '主程序用 --agent 启动后台模式，通过当前用户范围的 IPC 维持 Wi-Fi Direct publisher。',
			},
			{
				title: '用户数据保护',
				description: '非敏感设置写入 JSON，密码使用 DPAPI CurrentUser 加密，日志固定隐藏凭据内容。',
			},
		],
		cautions: [
			'仅局域网模式不代表可以访问互联网；它用于本机与连接设备之间的局域网通信。',
			'Wi-Fi Direct、Hosted Network 和连接设备明细会受无线网卡与驱动影响，某个 Provider 在其他设备上可能不可用。',
			'官方移动热点失败时应先查看诊断与错误码，不建议默认关闭防火墙、重置网络或进行无关系统修改。',
			'设置中保存的密码只对当前 Windows 用户可解密；迁移配置文件到其他账户后可能无法恢复凭据。',
			'使用开机自启、自动开启和“退出时保持热点”前，应先确认当前设备上的休眠恢复与驱动行为符合预期。',
		],
	},
	{
		slug: 'tdm-claim-toggle-patcher',
		item: getProject('tdm-claim-toggle-patcher'),
		pageDescription:
			'为 TwitchDropsMiner 源码增加可持久化的自动领取掉宝开关，支持兼容性检测、备份、恢复、GUI 与 CLI。',
		introduction: [
			'TwitchDropsMiner 掉宝自动领取开关补丁工具是一个独立、可审计、可恢复的源码补丁器。它为 TwitchDropsMiner 的设置界面增加“自动领取掉宝”开关，默认保持原有自动领取行为；关闭后不会调用领取操作，设置会持久化到目标项目原有配置。',
			'工具采用源码补丁，而不是 DLL 注入、进程内存修改、Python Monkey Patch、API Hook、网络劫持或 EXE 二进制修改。它只写入用户明确选择的 TwitchDropsMiner 源码目录。',
			'检测、备份、补丁和验证流程不会读取或复制 cookies.jar、登录令牌、用户名密码、代理认证信息或目标 settings.json。兼容性判断针对已识别的源码结构，不能解释为永久兼容所有未来版本。',
		],
		useCases: [
			{
				title: '按需关闭自动领取',
				description: '在保留 TwitchDropsMiner 其他调度行为的同时，控制是否执行掉宝领取调用。',
			},
			{
				title: '更新前检查兼容性',
				description: '先检测语义锚点和源码结构，再通过干运行查看计划改动，避免盲目修改未知版本。',
			},
			{
				title: '可追踪地应用与恢复',
				description: '在修改前创建带哈希和 manifest 的备份，更新上游前可以恢复最近一次补丁。',
			},
		],
		featureGroups: [
			{
				title: '检测、补丁与恢复',
				items: [
					{
						title: 'GUI 与 CLI',
						description: '提供图形界面和命令行入口，界面、帮助、报告与日志支持简体中文和英文。',
					},
					{
						title: '语义兼容性检测',
						description: '结合 Python AST、调用关系和语义锚点识别设置模型、领取调用、调度与翻译字典。',
					},
					{
						title: '干运行',
						description: '在写入前报告将要修改的文件和兼容状态，遇到歧义或验证失败时停止。',
					},
					{
						title: '可持久化领取开关',
						description: '默认开启自动领取；关闭后不调用 Drop.claim，也不会发送领取 mutation。',
					},
					{
						title: '原子备份与恢复',
						description: '只备份实际修改的文件，记录前后哈希；恢复时检测补丁后产生的冲突。',
					},
					{
						title: '保持编码与换行',
						description: '在 AST 提供的源码范围内做小范围文本修改，保留 UTF-8 BOM、CRLF/LF、注释和周边格式。',
					},
					{
						title: '状态与 JSON 报告',
						description: '可检查补丁状态，非 GUI 命令支持 --json 输出结构化兼容性和操作报告。',
					},
					{
						title: '构建目标 EXE',
						description: '可调用目标项目自己的 build.spec 构建 TwitchDropsMiner；只应对可信源码执行此操作。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载并启动补丁工具',
				description: '从 GitHub Releases 下载 Windows 单文件程序并运行；也可以使用 Python 3.10 或更高版本从源码启动。',
				command: `python -m tdm_claim_toggle_patcher
python -m tdm_claim_toggle_patcher gui --target "C:\\path\\to\\TwitchDropsMiner"`,
			},
			{
				title: '选择源码目录',
				description: '选择可信的 TwitchDropsMiner 源码根目录，不要选择已打包 EXE、用户数据目录或来历不明的副本。',
			},
			{
				title: '检测兼容性',
				description: '先执行“检测兼容性”，查看上游版本、Git commit、adapter、语义锚点数量和警告。',
			},
			{
				title: '执行干运行',
				description: '使用“干运行”确认计划修改内容；状态为不支持、歧义或验证失败时不要强行继续。',
			},
			{
				title: '应用补丁',
				description: '确认结果后应用补丁。工具会先创建备份，再修改并验证目标源码。',
			},
			{
				title: '运行补丁后的项目',
				description: '启动补丁后的 TwitchDropsMiner，在设置中按需打开或关闭自动领取掉宝。',
			},
			{
				title: '按需使用 CLI',
				description: '从源码运行时可按下列顺序检查、干运行、应用、查看状态与恢复。',
				command: `python -m tdm_claim_toggle_patcher check --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher dry-run --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher apply --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher status --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher restore --target "C:\\path\\to\\TwitchDropsMiner"`,
			},
			{
				title: '更新上游前恢复',
				description: '更新 TwitchDropsMiner 前先恢复补丁；更新完成后重新执行兼容性检测与干运行。',
			},
		],
		requirements: [
			{
				term: 'Windows 发布资产',
				description: 'GitHub Releases 提供同时支持 GUI 与 CLI 的单文件 EXE，不需要管理员权限。',
			},
			{
				term: '源码运行',
				description: '需要 Python 3.10 或更高版本；补丁器运行时本身只依赖 Python 标准库。',
			},
			{
				term: '目标源码',
				description: '需要可识别的 TwitchDropsMiner 源码目录；当前 adapter 面向包含 settings.py、gui.py、inventory.py、twitch.py、translate.py、main.py 与 lang/*.json 的扁平结构。',
			},
			{
				term: '构建目标 EXE',
				description: '该操作会运行目标项目的 build.spec，并按目标 requirements 安装依赖与 PyInstaller，因此只应构建可信源码。',
			},
			{
				term: '补丁器配置',
				description: 'Windows 下保存在 %LOCALAPPDATA%\\TDMClaimTogglePatcher\\settings.json，并使用 UTF-8 JSON 原子写入。',
			},
		],
		technicalDetails: [
			{
				title: 'Python AST 辅助检测',
				description: 'AST 用于定位语义结构，实际写入保持为受控的小范围文本修改，避免重新生成整个文件。',
			},
			{
				title: 'Adapter 与失败关闭',
				description: '先识别支持的源码布局与语义锚点；检测不确定、歧义或验证失败时停止修改。',
			},
			{
				title: 'Manifest 与哈希',
				description: '备份目录记录目标路径、adapter、兼容性、前后哈希、文件大小和验证结果。',
			},
			{
				title: '控制逻辑边界',
				description: '关闭开关只阻止领取调用，不伪造 Twitch 服务端 is_claimed 状态，也不把估算进度当作已完成。',
			},
		],
		cautions: [
			'Twitch 的部分活动可能要求先领取前置奖励；关闭自动领取可能阻止后续掉宝继续推进。',
			'未领取奖励可能按活动规则过期，关闭自动领取前应自行确认活动期限与领取条件。',
			'每次更新 TwitchDropsMiner 后都应重新执行兼容性检测和干运行，不要沿用旧版本结论。',
			'构建目标 EXE 会执行目标仓库的构建脚本和依赖安装钩子，只对可信源码目录执行。',
			'不要分享 cookies.jar、Token、settings.json、代理凭据或可能包含认证信息的文件与日志。',
		],
	},
];
