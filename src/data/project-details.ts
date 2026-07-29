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
	useCasesTitle?: string;
	featureGroups: ProjectFeatureGroup[];
	installationSteps?: ProjectStep[];
	steps: ProjectStep[];
	stepsTitle?: string;
	requirements: ProjectRequirement[];
	requirementsTitle?: string;
	technicalDetails: DetailItem[];
	technicalTitle?: string;
	cautions: string[];
	ctaTitle?: string;
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
		slug: 'cloudlight-automator',
		item: getProject('cloudlight-automator'),
		pageDescription:
			'用可视化流程图编排窗口、截图、图像识别、OCR、剪贴板和键鼠操作，创建可重复运行的 Windows 自动化流程。',
		introduction: [
			'CloudLight 自动化工作室是一款面向 Windows 10/11 x64 的本地可视化自动化软件。用户可以把节点拖到画布上，连接执行顺序和数据端口，填写参数后直接运行工作流。',
			'它可以把窗口操作、截图、图片识别、文字识别、剪贴板和键鼠输入组合在同一条流程中。变量、节点输出、条件分支和有限循环则用于处理识别结果与不同运行情况。',
			'工作流可以打开、保存和重复运行，文件扩展名为 .workflow.json。软件提供简体中文与英文界面，也附带窗口与截图、图像与 OCR、变量与循环三组示例，便于从现有流程开始了解节点用法。',
		],
		useCases: [
			{
				title: '整理重复的桌面操作',
				description: '把需要反复执行的窗口切换、截图、复制粘贴和键鼠操作整理成一条可重复运行的流程。',
			},
			{
				title: '根据识别结果继续执行',
				description: '识别屏幕中的模板图片或文字，再把识别结果交给后续节点判断和处理。',
			},
			{
				title: '处理不同运行情况',
				description: '使用变量、节点输出、可视化表达式和 If 条件，根据当前数据选择下一步操作。',
			},
			{
				title: '保存并复用工作流',
				description: '将流程保存为 .workflow.json 文件，之后可以再次打开、调整参数或在相同环境中运行。',
			},
		],
		featureGroups: [
			{
				title: '窗口、截图与识别',
				items: [
					{
						title: '窗口操作',
						description: '查找并操作桌面窗口，为后续截图、识别和输入步骤准备目标环境。',
					},
					{
						title: '多种截图范围',
						description: '可以截取全屏、指定窗口或选定区域，并把图片交给后续节点使用。',
					},
					{
						title: '模板图片识别',
						description: '在截图中查找指定模板，利用位置和匹配结果决定后续操作。',
					},
					{
						title: '离线文字识别',
						description: '使用内置 OCR 识别简体中文和英文，无需另外安装识别程序。',
					},
				],
			},
			{
				title: '剪贴板与键鼠输入',
				items: [
					{
						title: '文本和图片剪贴板',
						description: '读取或写入剪贴板中的文本与图片，让桌面程序之间能够传递内容。',
					},
					{
						title: '键盘与鼠标操作',
						description: '通过独立输入辅助程序执行键盘和鼠标动作；运行时目标窗口需要保持在前台。',
					},
				],
			},
			{
				title: '流程控制与复用',
				items: [
					{
						title: '变量和节点输出',
						description: '保存前面节点产生的数据，并在后续参数和判断中继续使用。',
					},
					{
						title: '条件与表达式',
						description: '通过可视化表达式和 If 分支处理不同结果，不必把所有情况写成同一条固定路径。',
					},
					{
						title: '有限循环控制',
						description: 'Repeat 和 While 均要求明确的次数或边界，并可使用 Break 与 Continue 调整循环过程。',
					},
					{
						title: '工作流管理',
						description: '可以新建、打开、保存和运行工作流，并在简体中文与英文界面之间切换。',
					},
				],
			},
		],
		steps: [
			{
				title: '下载安装包或便携版',
				description: '前往 GitHub Releases，按需要下载 Windows x64 当前用户安装包或便携 ZIP。',
			},
			{
				title: '核对 SHA-256',
				description: '下载同一发布中的 checksums.txt，核对安装包或便携 ZIP 的 SHA-256，确认文件与发布记录一致。',
			},
			{
				title: '安装或解压运行',
				description: '安装版按当前用户安装；便携版需要先完整解压，并保留程序旁的 portable.marker 和其他文件。',
			},
			{
				title: '新建或打开工作流',
				description: '从空白画布开始，或打开已有的 .workflow.json。也可以参考内置的窗口与截图、图像与 OCR、变量与循环示例。',
			},
			{
				title: '从节点库拖入节点',
				description: '根据任务需要选择窗口、截图、识别、剪贴板、键鼠输入或流程控制节点。',
			},
			{
				title: '连接端口并填写参数',
				description: '连接执行顺序和数据端口，再填写窗口、图片、文字、坐标或表达式等参数。',
			},
			{
				title: '保存工作流',
				description: '运行前先保存 .workflow.json，并确认其中引用的本地图片和模板路径仍然有效。',
			},
			{
				title: '运行并查看状态',
				description: '启动工作流后观察节点状态和输出，确认每一步都在预期窗口和数据上执行。',
			},
			{
				title: '异常时停止',
				description: '流程出现异常、操作了错误窗口或结果偏离预期时，立即点击停止，不要让后续输入动作继续执行。',
			},
			{
				title: '查看日志',
				description: '需要排查节点失败或运行问题时，通过设置页打开日志位置并检查对应记录。',
			},
		],
		requirements: [
			{
				term: '操作系统',
				description: 'Windows 10 或 Windows 11 x64；当前没有 macOS、Linux、ARM64 或 x86 版本。',
			},
			{
				term: '安装权限',
				description: '安装版默认只为当前用户安装，不需要管理员权限。',
			},
			{
				term: '随包运行环境',
				description: '安装包和便携版已内置 Python worker、.NET InputHelper、Tesseract 以及简体中文和英文语言数据。普通用户无需另外安装 Node.js、Python、.NET SDK 或 Tesseract。',
			},
			{
				term: '安装版数据',
				description: '设置、日志和其他应用数据保存在 %APPDATA%\\CloudLight Automator。',
			},
			{
				term: '默认工作流目录',
				description: '默认工作流保存在 %USERPROFILE%\\Documents\\CloudLight Automator\\Workflows。',
			},
			{
				term: '便携版数据',
				description: '便携版把数据保存在可执行文件旁的 data 目录，包括设置、日志、自动保存、临时文件和工作流。移动时应复制整个解压目录，并保留 portable.marker。',
			},
		],
		technicalDetails: [
			{
				title: '可视化编辑器',
				description: '桌面界面由 Electron、React、TypeScript 和 React Flow 构建，负责节点画布、参数编辑和运行状态展示。',
			},
			{
				title: '独立运行进程',
				description: '每次运行都会启动一个独立 Python worker，流程停止或结束后不复用上一次的执行进程。',
			},
			{
				title: '节点状态传递',
				description: 'worker 通过逐行 JSON（NDJSON）协议返回节点开始、输出、完成和错误等状态。',
			},
			{
				title: '自动化能力',
				description: '部分桌面自动化节点基于仓库锁定版本的 RPA Framework，只开放经过筛选并列入正式目录的能力。',
			},
			{
				title: '键鼠输入',
				description: '键盘和鼠标动作由独立的 .NET 10 InputHelper 执行，与工作流编辑界面分开。',
			},
			{
				title: '离线 OCR',
				description: '文字识别使用内置 Tesseract，并附带英文与简体中文语言数据。',
			},
			{
				title: '正式节点目录',
				description: '当前版本的 62 个可执行节点来自统一白名单；未进入正式目录的实验候选节点不会显示，也不能执行。',
			},
		],
		cautions: [
			'当前版本为 0.1.0，正式目录包含 62 个可执行节点。实验候选节点不会出现在节点库中，也不能通过工作流执行。',
			'当前执行器不支持并行执行、任意环或无限循环。Repeat 和 While 必须具有明确的有限边界。',
			'键盘和鼠标输入会发送到当前前台窗口。运行前应确认目标窗口已经获得焦点，执行过程中不要切换到其他敏感窗口。',
			'OCR 结果会受到字体、系统缩放、截图范围和图像质量影响。用于流程判断前，应先在实际环境中检查识别结果。',
			'当前发布没有代码签名，Windows 可能显示 SmartScreen 或未知发布者提示。请从项目的 GitHub Releases 下载，并使用 checksums.txt 核对 SHA-256。',
			'当前版本尚未完成独立干净 Windows 环境验证。正式使用前，应先在可控环境中测试完整流程及停止操作。',
			'移动或分享工作流时，需要同时检查其中引用的本地图片和模板路径；只复制 .workflow.json 不一定能带走全部依赖文件。',
		],
	},
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
	{
		slug: 'shanda-passport-login-helper',
		item: getProject('shanda-passport-login-helper'),
		pageDescription:
			'在盛大通行证登录页面自动勾选协议、切换到一键登录方式，并填写保存在用户脚本管理器本地存储中的账号。',
		introduction: [
			'盛大通行证一键登录辅助脚本是一款运行在浏览器用户脚本管理器中的登录页面辅助工具。Greasy Fork 上的正式名称为“盛大通行证自动切换一键登录并填写账号”，当前公开版本为 1.1.0。',
			'脚本在匹配的盛大通行证登录页面进入空闲状态后运行：勾选登录协议复选框、点击“一键登录”切换项，并把预先保存的账号写入账号输入框。页面重新渲染时，它会在前 30 秒内继续检查这些元素。',
			'它不会点击最终登录按钮，也没有处理短信确认、手机确认、验证码或其他安全验证的代码。账号之外的登录步骤仍需由用户本人在盛大通行证页面完成。',
		],
		useCasesTitle: '适用页面',
		useCases: [
			{
				title: '匹配的网站范围',
				description: '脚本的 @match 为 *://login.u.sdo.com/*，即该主机下通过 HTTP 或 HTTPS 打开的路径。',
			},
			{
				title: '实际生效条件',
				description: '页面需要包含登录协议、切换一键登录和账号输入框对应的元素；缺少相应元素时，该项操作会跳过。',
			},
			{
				title: '兼容边界',
				description: '源码没有匹配其他盛大或盛趣域名，也没有声明适配 login.u.sdo.com 之外的登录页面。',
			},
		],
		featureGroups: [
			{
				title: '登录页面辅助',
				items: [
					{
						title: '勾选登录协议',
						description: '找到登录协议复选框后将其设为已勾选，并触发 input 与 change 事件。使用前仍应由用户自行阅读并确认相关协议。',
					},
					{
						title: '切换一键登录',
						description: '找到“一键登录”导航按钮后自动点击；同一次页面运行中只执行一次该点击。',
					},
					{
						title: '填写保存的账号',
						description: '读取本地保存的账号，写入 username 输入框，并触发 input、change 与 blur 事件以兼容页面自身逻辑。',
					},
					{
						title: '处理页面重新渲染',
						description: 'MutationObserver 会观察页面结构变化，并配合每 500 毫秒一次的检查；30 秒后停止观察与定时检查。',
					},
				],
			},
			{
				title: '账号管理',
				items: [
					{
						title: '设置登录账号',
						description: '通过用户脚本管理器菜单打开输入框，保存去除首尾空格后的账号，并立即尝试填入当前页面。',
					},
					{
						title: '清除登录账号',
						description: '通过菜单把已保存值设为空字符串；如果账号输入框存在，也会同时清空当前页面中的账号。',
					},
				],
			},
		],
		installationSteps: [
			{
				title: '安装用户脚本管理器',
				description: '先在浏览器中安装 Tampermonkey、Violentmonkey 或其他兼容的用户脚本管理器。',
			},
			{
				title: '从 Greasy Fork 打开安装文件',
				description: '使用本页的“安装脚本”入口打开 Greasy Fork 提供的 .user.js 文件。',
			},
			{
				title: '核对并确认安装',
				description: '在脚本管理器的安装界面核对名称、版本、匹配范围和权限，确认后再完成安装。',
			},
		],
		stepsTitle: '使用方法',
		steps: [
			{
				title: '确认脚本已启用',
				description: '在用户脚本管理器中确认脚本处于启用状态。',
			},
			{
				title: '打开账号设置',
				description: '从用户脚本管理器的脚本菜单选择“设置登录账号”。',
			},
			{
				title: '保存账号',
				description: '在提示框中输入绑定手机的账号或手机账号。脚本会把去除首尾空格后的内容保存到脚本管理器本地存储。',
			},
			{
				title: '打开支持的登录页面',
				description: '访问 login.u.sdo.com 下的登录页面；脚本会尝试勾选协议、切换一键登录并填写已保存账号。',
			},
			{
				title: '完成安全验证',
				description: '由用户本人完成短信、手机确认、验证码或页面要求的其他安全步骤，并自行确认最终登录。',
			},
			{
				title: '按需清除账号',
				description: '不再使用时，从脚本菜单选择“清除登录账号”；也可以在设置账号时提交空内容来清除保存值。',
			},
		],
		requirementsTitle: '数据与隐私说明',
		requirements: [
			{
				term: '保存位置',
				description: '账号通过 GM_setValue 保存在当前用户脚本管理器的本地值存储中，键名为 sdo_login_account；不使用网站的 localStorage。',
			},
			{
				term: '保存内容',
				description: '只保存用户在“设置登录账号”提示框中输入并去除首尾空格后的账号字符串。主站不会接收或保存这项数据。',
			},
			{
				term: '密码',
				description: '当前源码没有读取、填写或保存密码，也没有查询密码输入框。',
			},
			{
				term: '网络传输',
				description: '当前源码没有网络请求代码，也未申请跨域连接权限；脚本本身不会把保存值发送到第三方服务器。账号被填入目标登录页后，仍受该页面自身的数据处理方式约束。',
			},
			{
				term: '清除方法',
				description: '选择脚本菜单中的“清除登录账号”，或在“设置登录账号”时提交空内容。两种方式都会把 sdo_login_account 设为空字符串。',
			},
		],
		technicalTitle: '权限说明',
		technicalDetails: [
			{
				title: '@match',
				description: '*://login.u.sdo.com/*，只在该主机范围的页面加载脚本。',
			},
			{
				title: 'GM_getValue 与 GM_setValue',
				description: '用于读取和保存账号字符串。保存位置由 Tampermonkey、Violentmonkey 等脚本管理器管理。',
			},
			{
				title: 'GM_registerMenuCommand',
				description: '用于注册“设置登录账号”和“清除登录账号”两个脚本菜单命令。',
			},
			{
				title: '运行与网络权限',
				description: '脚本在 document-idle 时运行，没有 @connect、GM_xmlhttpRequest 或同类网络权限；安装与更新地址由 Greasy Fork 元数据提供。',
			},
		],
		cautions: [
			'这是非官方用户脚本，与盛趣游戏、盛大网络及相关登录平台无官方关联。',
			'登录页面结构变化后，脚本依赖的元素可能找不到，功能可能暂时失效。',
			'安装或更新前应自行确认脚本权限、匹配范围和源代码，并留意 Greasy Fork 上的版本变化。',
			'脚本不自动绕过验证码、短信验证、手机确认或其他安全机制，也不会替用户点击最终登录按钮。',
			'不要在公共电脑、共享浏览器配置或不受信任的设备上保存账号。',
			'具体兼容范围以当前 Greasy Fork 页面和源码为准；当前 @match 仅为 *://login.u.sdo.com/*。',
		],
		ctaTitle: '安装入口',
	},
];
