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
			'查找 Windows 10/11 中被隐藏的高级电源选项，并管理它们的显示、隐藏和恢复。修改前会保存快照和注册表备份。',
		introduction: [
			'Windows 的经典“高级电源设置”中有不少选项默认不会显示，查找对应的注册表位置也很麻烦。这个工具会扫描系统中的电源选项，把名称、分组、GUID 和当前显示状态集中列出来。',
			'它只管理选项是否出现在经典设置窗口中，不会替你修改交流电或电池模式下的具体参数。扫描过程只读取系统信息，不需要管理员权限。',
			'真正执行显示、隐藏或恢复时，程序会先展示完整注册表路径、原值和目标值。确认后才请求 UAC，并在写入前保存注册表备份，方便之后检查或恢复。',
		],
		useCases: [
			{
				title: '找出隐藏的电源选项',
				description: '按名称、分组、GUID 或显示状态，查找经典控制面板中没有出现的设置。',
			},
			{
				title: '集中调整显示状态',
				description: '核对原值后，可以批量显示、隐藏或恢复选中的电源设置。',
			},
			{
				title: '保留修改记录',
				description: '通过状态快照、注册表备份、导出文件和日志，了解修改前后的变化。',
			},
		],
		featureGroups: [
			{
				title: '扫描、筛选与恢复',
				items: [
					{
						title: '完整扫描',
						description: '先运行 powercfg.exe /q，再读取 64 位 PowerSettings 注册表，尽量收集完整的设置列表。',
					},
					{
						title: '中文名称与 GUID',
						description: '把两处数据按 GUID 对应起来，同时显示英文名称、中文名称、分组和完整路径。',
					},
					{
						title: '搜索和筛选',
						description: '可以按名称、分组、GUID、显示状态或是否已选中来缩小列表范围。',
					},
					{
						title: '批量显示、隐藏和恢复',
						description: '勾选多个项目后统一处理，也可以恢复软件记录过的全部修改。',
					},
					{
						title: '启动时保存状态快照',
						description: '每次启动后的第一次完整扫描成功时，程序会保存一份全部设置的状态快照。',
					},
					{
						title: '修改前保存注册表备份',
						description: '写入前记录 Attributes 原值以及该值原本是否存在，恢复时以这份记录为准。',
					},
					{
						title: '导出和导入',
						description: '扫描结果可以导出为 JSON 或 CSV，注册表原值可以导出为 .reg；软件备份也能重新导入并验证。',
					},
					{
						title: '逐项结果和日志',
						description: '操作结束后可以查看每一项的结果。遇到失败时，日志会保留路径、错误和验证信息。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载并解压',
				description: '从 GitHub Releases 下载 Windows x64 便携 ZIP，解压到当前用户有写入权限的普通文件夹。',
			},
			{
				title: '运行程序',
				description: '打开 PowerSettingsManager.exe，并保留同目录中的 PowerSettingsManager.ElevatedHelper.exe。',
			},
			{
				title: '扫描电源设置',
				description: '点击扫描并等待列表生成。扫描只读取 powercfg 和注册表，不会请求管理员权限。',
			},
			{
				title: '查找目标项目',
				description: '使用搜索、分组、GUID 和状态筛选找到需要处理的设置，然后勾选对应项目。',
			},
			{
				title: '核对原值和目标值',
				description: '在确认窗口中检查完整注册表路径、扫描到的原值和准备写入的目标值。',
			},
			{
				title: '确认修改',
				description: '选择显示、隐藏或恢复，阅读风险提示后通过 UAC，让辅助程序执行这一次修改。',
			},
			{
				title: '查看操作结果',
				description: '逐项检查成功、失败、跳过和写入后验证结果。失败项目可以结合日志继续排查。',
			},
			{
				title: '重新打开电源设置',
				description: '关闭并重新打开 Windows 高级电源设置窗口，确认目标选项是否已经出现或隐藏。',
			},
			{
				title: '保留备份',
				description: '不要随意删除 Data 文件夹。卸载前先在应用中恢复修改，再备份 Data 并删除便携程序目录。',
			},
		],
		requirements: [
			{
				term: '操作系统',
				description: 'Windows 10 x64 或 Windows 11 x64；没有 x86 和 ARM64 构建。',
			},
			{
				term: '运行环境',
				description: 'GitHub 上的便携包已经包含运行所需组件。自行发布框架依赖版本时，需要 x64 .NET 8 Desktop Runtime；从源码构建需要 .NET 8 SDK。',
			},
			{
				term: '管理员权限',
				description: '扫描和保存快照不需要管理员权限。写入、删除或恢复 HKLM 中的值时才会触发 UAC。',
			},
			{
				term: '数据目录',
				description: '程序需要在自身目录中创建和写入 Data 文件夹。',
			},
			{
				term: '程序形式',
				description: '目前是便携程序，没有安装器、代码签名和自动更新。不建议放在 Program Files 中运行。',
			},
		],
		technicalDetails: [
			{
				title: '界面与核心功能',
				description: '程序使用 .NET 8 和 WPF。界面、数据处理、系统读取和提权写入分别放在不同模块中。',
			},
			{
				title: '合并两处系统数据',
				description: '程序解析中英文 powercfg 输出，再按 GUID 合并注册表中的名称、说明和 Attributes 状态。',
			},
			{
				title: '按需提权',
				description: '主程序保持普通权限。辅助程序只接受经过验证的 GUID，不接收任意命令或注册表路径。',
			},
			{
				title: '本地数据保存',
				description: '快照、备份、日志和配置都保存在程序目录的 Data 文件夹中；关键 JSON 通过临时文件和原子替换写入。',
			},
		],
		cautions: [
			'修改 HKLM 注册表存在系统配置风险。只处理自己理解并已经核对路径与原值的项目。',
			'不要删除或单独移动 PowerSettingsManager.ElevatedHelper.exe，否则显示、隐藏和恢复功能无法工作。',
			'不要随意删除 Data 文件夹。StartupSnapshots 中的状态快照不能代替 RegistryBackups 中的恢复记录。',
			'不同 Windows 版本、电脑厂商、电源驱动和 Modern Standby 配置会影响结果；有些设置即使改为显示，也可能仍不出现或不生效。',
			'当前下载包没有商业代码签名，Windows 可能显示未知发布者提示。可以使用 Release 附带的 SHA-256 文件校验 ZIP。',
		],
	},
	{
		slug: 'mobile-hotspot-controller',
		item: getProject('mobile-hotspot-controller'),
		pageDescription:
			'管理 Windows 11 移动热点；在设备支持时，也可以通过 Wi-Fi Direct 创建只供局域网连接的热点。',
		introduction: [
			'需要临时共享网络，或者想让几台设备在没有互联网时组成局域网，都可能用到电脑热点。Windows 移动热点控制器把热点名称、密码、运行状态和常用操作放在同一个界面中。',
			'有网络时，程序会优先使用 Windows 系统移动热点。只需要局域网时，可以尝试通过 Wi-Fi Direct 创建热点；这种模式不共享互联网。',
			'热点功能是否可用，取决于 Windows 版本、无线网卡和驱动。程序会显示每种热点方式的检测结果和系统错误，方便判断问题出在设置、硬件还是驱动。',
		],
		useCases: [
			{
				title: '打开或关闭系统热点',
				description: '设置热点名称和密码，在一个界面中启动、停止或重新启动 Windows 移动热点。',
			},
			{
				title: '建立离线局域网',
				description: '设备支持 Wi-Fi Direct 时，可以让附近设备连接电脑进行局域网通信。',
			},
			{
				title: '检查热点为什么不可用',
				description: '查看网络状态、热点方式和系统错误码，判断是否受到网卡或驱动限制。',
			},
		],
		featureGroups: [
			{
				title: '热点控制与日常使用',
				items: [
					{
						title: '两种使用模式',
						description: '可以选择“互联网共享优先”或“仅局域网”。系统热点失败后，也能按设置尝试局域网模式。',
					},
					{
						title: '自动选择可用的热点方式',
						description: '程序会依次检查 Windows 系统热点、Wi-Fi Direct 和 Hosted Network，并记录每种方式的检测结果。',
					},
					{
						title: '检查热点名称和密码',
						description: '输入时会检查 SSID 长度和密码格式，避免把明显无效的配置交给 Windows。',
					},
					{
						title: '后台保持热点',
						description: '主窗口关闭或隐藏后，后台 Agent 可以继续保持需要常驻的 Wi-Fi Direct 热点。',
					},
					{
						title: '托盘和启动设置',
						description: '可以从系统托盘控制热点，并设置开机启动、启动时最小化、延迟自动开启和退出行为。',
					},
					{
						title: '诊断和日志',
						description: '界面会显示网络和热点状态，也可以复制或导出诊断信息，保留 Windows 返回的原始错误码。',
					},
					{
						title: '保护热点密码',
						description: '密码使用当前 Windows 用户的数据保护功能加密，普通设置文件和日志不会记录明文密码。',
					},
				],
			},
			{
				title: '硬件和驱动差异',
				description: '不同电脑上的可用方式可能不同，以下功能都需要以本机检测结果为准。',
				items: [
					{
						title: 'Wi-Fi Direct 局域网热点',
						description: '这个模式只建立局域网，不共享互联网。设备发现、地址分配和双向通信仍由网卡驱动决定。',
					},
					{
						title: 'Hosted Network',
						description: '只有旧版 Hosted Network 能力可用时才会尝试。许多新网卡已经不再提供这项能力。',
					},
					{
						title: '连接设备信息',
						description: '连接数量以 Windows 返回的结果为准；名称、IP 和 MAC 地址会尽量从系统邻居表补充。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载程序',
				description: '从 GitHub Releases 下载 MobileHotspotController.exe。发布文件适用于 Windows 11 x64，并已包含运行时。',
			},
			{
				title: '运行并检查设备',
				description: '启动程序后先打开“系统诊断”，查看无线设备、当前网络和可用热点方式。',
			},
			{
				title: '填写热点信息',
				description: '输入热点名称和密码。密码需由 8–63 个可打印 ASCII 字符组成。',
			},
			{
				title: '选择模式',
				description: '选择“互联网共享优先”或“仅局域网”，再决定系统热点失败时是否尝试局域网模式。',
			},
			{
				title: '打开热点',
				description: '点击“打开热点”，查看实际使用的热点方式、网络状态和连接设备数量。',
			},
			{
				title: '按需设置托盘和启动行为',
				description: '可以设置开机启动、启动时最小化、自动开启、重试次数和关闭窗口后的行为。',
			},
			{
				title: '查看失败原因',
				description: '热点无法启动时，复制或导出诊断报告并记录错误码。不要把关闭防火墙或重置网络当作默认解决办法。',
			},
			{
				title: '退出或移除',
				description: '先根据需要关闭热点，再退出托盘中的程序。删除 EXE 不会同时删除 %AppData%\\MobileHotspotController 中的用户数据。',
			},
		],
		requirements: [
			{
				term: '操作系统',
				description: 'Windows 11 x64，最低系统版本为 Windows 11 build 22000。',
			},
			{
				term: '运行环境',
				description: '已发布的单文件 EXE 包含运行所需组件。从源码构建时，请按仓库 global.json 安装对应 .NET SDK；应用目标为 .NET 8。',
			},
			{
				term: '无线设备',
				description: '需要 Windows 能识别的 Wi-Fi 设备。可用的热点方式由网卡、驱动和系统能力决定。',
			},
			{
				term: '权限',
				description: '主界面和后台 Agent 以普通用户权限运行。个别系统修复操作能否执行，仍取决于 Windows 权限和服务状态。',
			},
			{
				term: '数据位置',
				description: '设置、加密后的密码、日志、诊断和备份保存在 %AppData%\\MobileHotspotController。',
			},
		],
		technicalDetails: [
			{
				title: '桌面界面',
				description: '程序使用 .NET 8、WPF 和 MVVM，把界面状态与 Windows 热点调用分开处理。',
			},
			{
				title: '热点方式切换',
				description: '核心模块统一处理热点的启动、停止和重试；Windows 相关调用集中在独立模块中。',
			},
			{
				title: '后台 Agent',
				description: '同一个 EXE 可以通过 --agent 参数启动后台模式，并通过当前用户范围内的进程间通信维持热点状态。',
			},
			{
				title: '本地数据保护',
				description: '普通设置保存为 JSON；热点密码使用 DPAPI CurrentUser 加密，日志会隐藏凭据内容。',
			},
		],
		cautions: [
			'“仅局域网”不代表可以访问互联网，它只用于电脑与已连接设备之间的局域网通信。',
			'Wi-Fi Direct、Hosted Network 和设备详情都受无线网卡与驱动影响；同一项功能在另一台电脑上可能不可用。',
			'系统移动热点失败时，应先查看诊断信息和错误码。不要默认关闭防火墙、重置网络或修改无关设置。',
			'保存的热点密码只能由当前 Windows 用户解密。把配置复制到其他账户后，原密码可能无法读取。',
			'启用开机启动、自动开启或“退出后保持热点”前，建议先确认本机在休眠和恢复后的实际表现。',
		],
	},
	{
		slug: 'tdm-claim-toggle-patcher',
		item: getProject('tdm-claim-toggle-patcher'),
		pageDescription:
			'为 TwitchDropsMiner 增加可开关的自动领取掉宝功能。修改前会检查源码兼容性，并保存可以恢复的备份。',
		introduction: [
			'TwitchDropsMiner 默认会自动领取已经完成的掉宝。如果想暂时停止领取，同时保留其他运行流程，就需要修改源码中的领取逻辑。',
			'这个补丁工具会在 TwitchDropsMiner 设置中加入“自动领取掉宝”开关。开关默认开启；关闭后不再执行领取操作，选择结果会保存在原有设置中。',
			'工具只修改你选中的 TwitchDropsMiner 源码目录，不会注入 DLL、修改进程内存、劫持网络或直接改写 EXE。开始写入前，它会检查源码结构并创建备份；无法确定兼容性时会停止。',
			'检查和补丁过程不会读取或复制 cookies.jar、登录令牌、用户名密码、代理凭据或目标 settings.json。',
		],
		useCases: [
			{
				title: '暂时关闭自动领取',
				description: '不改变 TwitchDropsMiner 的其他运行流程，只控制是否提交掉宝领取操作。',
			},
			{
				title: '修改前确认兼容性',
				description: '先检查源码结构，再通过干运行预览准备修改的文件，避免直接改动未知版本。',
			},
			{
				title: '留下可恢复的备份',
				description: '修改前记录文件和哈希。更新 TwitchDropsMiner 之前，可以先恢复最近一次补丁。',
			},
		],
		featureGroups: [
			{
				title: '检查、应用与恢复',
				items: [
					{
						title: '图形界面和命令行',
						description: '既可以使用图形界面，也可以运行 CLI 命令。界面、帮助、报告和日志提供简体中文与英文。',
					},
					{
						title: '先检查再修改',
						description: '程序会分析 Python 代码结构和调用关系，确认设置、领取和调度位置是否符合已知布局。',
					},
					{
						title: '干运行',
						description: '写入前列出准备修改的文件和检查结果；出现歧义或验证失败时不会继续。',
					},
					{
						title: '自动领取开关',
						description: '默认保持原有自动领取行为。关闭后不会调用 Drop.claim，也不会发送领取请求。',
					},
					{
						title: '备份和冲突保护',
						description: '只备份实际要修改的文件，并记录前后哈希。文件后来被改过时，恢复操作会先提示冲突。',
					},
					{
						title: '保留原文件格式',
						description: '修改范围限制在已经定位的代码片段，尽量保留 BOM、换行方式、注释和周边排版。',
					},
					{
						title: '状态和 JSON 报告',
						description: '可以查看补丁状态；命令行模式还可以用 --json 输出便于保存和排查的报告。',
					},
					{
						title: '构建目标程序',
						description: '可以调用目标项目的 build.spec 构建 TwitchDropsMiner EXE。这个操作只应在可信源码上执行。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载并启动',
				description: '从 GitHub Releases 下载 Windows 单文件程序并运行。也可以使用 Python 3.10 或更高版本从源码启动。',
				command: `python -m tdm_claim_toggle_patcher
python -m tdm_claim_toggle_patcher gui --target "C:\\path\\to\\TwitchDropsMiner"`,
			},
			{
				title: '选择源码目录',
				description: '选择可信的 TwitchDropsMiner 源码根目录，不要选择已经打包的 EXE、用户数据目录或来历不明的副本。',
			},
			{
				title: '检查兼容性',
				description: '点击“检测兼容性”，确认工具能够识别这个版本，并阅读界面中的警告和错误。',
			},
			{
				title: '先做干运行',
				description: '使用“干运行”预览准备修改的文件。检查结果为不支持、歧义或失败时不要继续。',
			},
			{
				title: '应用补丁',
				description: '确认结果后应用补丁。工具会先创建备份，再写入并检查修改后的源码。',
			},
			{
				title: '使用自动领取开关',
				description: '启动补丁后的 TwitchDropsMiner，在设置中打开或关闭自动领取掉宝。',
			},
			{
				title: '按需使用命令行',
				description: '从源码运行时，可以按下面的顺序检查、预览、应用、查看状态和恢复。',
				command: `python -m tdm_claim_toggle_patcher check --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher dry-run --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher apply --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher status --target "C:\\path\\to\\TwitchDropsMiner"
python -m tdm_claim_toggle_patcher restore --target "C:\\path\\to\\TwitchDropsMiner"`,
			},
			{
				title: '更新前先恢复',
				description: '更新 TwitchDropsMiner 前先恢复补丁。更新完成后，重新检查兼容性并执行干运行。',
			},
		],
		requirements: [
			{
				term: 'Windows 下载版本',
				description: 'GitHub Releases 提供同时包含图形界面和命令行功能的单文件 EXE，不需要管理员权限。',
			},
			{
				term: '从源码运行',
				description: '需要 Python 3.10 或更高版本；补丁工具本身只使用 Python 标准库。',
			},
			{
				term: '目标源码',
				description: '需要完整的 TwitchDropsMiner 源码目录。当前兼容布局包含 settings.py、gui.py、inventory.py、twitch.py、translate.py、main.py 和 lang/*.json。',
			},
			{
				term: '构建 TwitchDropsMiner',
				description: '构建操作会运行目标仓库的 build.spec，并按 requirements 安装依赖和 PyInstaller。只对可信源码执行。',
			},
			{
				term: '配置位置',
				description: '补丁工具的设置保存在 %LOCALAPPDATA%\\TDMClaimTogglePatcher\\settings.json。',
			},
		],
		technicalDetails: [
			{
				title: '识别源码位置',
				description: '工具使用 Python 抽象语法树（AST）和调用关系定位相关代码，再对找到的片段做小范围文本修改。',
			},
			{
				title: '不确定时停止',
				description: '兼容适配器会检查已知源码布局。缺少关键位置、出现多个候选或修改后验证失败时，工具不会继续写入。',
			},
			{
				title: '备份记录',
				description: 'manifest.json 会记录目标目录、兼容结果、文件大小和修改前后哈希，方便检查与恢复。',
			},
			{
				title: '领取状态边界',
				description: '关闭开关只阻止领取调用，不会伪造 Twitch 返回的 is_claimed 状态，也不会把估算进度当成已经完成。',
			},
		],
		cautions: [
			'Twitch 的部分活动要求先领取前置奖励。关闭自动领取后，后续掉宝可能无法继续推进。',
			'未领取的奖励可能按活动规则过期。关闭自动领取前，请确认活动期限和领取条件。',
			'TwitchDropsMiner 更新后，源码结构可能变化。每次更新都应重新检查兼容性并执行干运行。',
			'构建 TwitchDropsMiner EXE 会运行目标仓库的脚本并安装依赖，只对可信源码目录执行。',
			'不要分享 cookies.jar、Token、settings.json、代理凭据，或任何可能包含认证信息的文件和日志。',
		],
	},
];
