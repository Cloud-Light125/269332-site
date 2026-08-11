import { getCatalogItem, type CatalogItem } from './catalog';

export interface DetailItem {
	title: string;
	description: string;
}

export interface ProjectFeatureGroup {
	title: string;
	items: DetailItem[];
}

export interface ProjectStep {
	title: string;
	description: string;
}

export interface ProjectRequirement {
	term: string;
	description: string;
}

export interface ProjectLink {
	label: string;
	href: string;
}

interface ProjectSectionBase {
	id: string;
	title: string;
	intro?: string[];
}

export interface ProjectFeaturesSection extends ProjectSectionBase {
	type: 'features';
	items: DetailItem[];
	layout?: 'list' | 'columns' | 'cards';
}

export interface ProjectFeatureGroupsSection extends ProjectSectionBase {
	type: 'feature-groups';
	groups: ProjectFeatureGroup[];
}

export interface ProjectStepsSection extends ProjectSectionBase {
	type: 'steps';
	items: ProjectStep[];
}

export interface ProjectFactsSection extends ProjectSectionBase {
	type: 'facts';
	items: ProjectRequirement[];
}

export interface ProjectBulletsSection extends ProjectSectionBase {
	type: 'bullets';
	items: string[];
	tone?: 'default' | 'warning';
}

export interface ProjectNoteSection extends ProjectSectionBase {
	type: 'note';
	description: string;
}

export interface ProjectScreenshotsSection extends ProjectSectionBase {
	type: 'screenshots';
	indexes: number[];
}

export interface ProjectLinksSection extends ProjectSectionBase {
	type: 'links';
	items: ProjectLink[];
}

export type ProjectSection =
	| ProjectFeaturesSection
	| ProjectFeatureGroupsSection
	| ProjectStepsSection
	| ProjectFactsSection
	| ProjectBulletsSection
	| ProjectNoteSection
	| ProjectScreenshotsSection
	| ProjectLinksSection;

export interface ProjectDetail {
	slug: string;
	item: CatalogItem;
	pageDescription: string;
	sections: ProjectSection[];
}

export const projectDetails: ProjectDetail[] = [
	{
		slug: 'cloudlight-automator',
		item: getCatalogItem('cloudlight-automator'),
		pageDescription: '用可视化流程组合窗口、截图、图像识别、文字识别和键鼠操作，创建可重复运行的 Windows 自动化任务。',
		sections: [
			{
				type: 'feature-groups',
				id: 'workflow',
				title: '把桌面操作连成工作流',
				intro: ['把节点拖到画布上，连接执行顺序和数据，再填写参数，就能把窗口操作、识别和键鼠输入保存成一条可重复运行的流程。软件附带示例工作流，并提供简体中文和英文界面。'],
				groups: [
					{
						title: '读取屏幕内容',
						items: [
							{ title: '窗口与截图', description: '查找桌面窗口，截取全屏、指定窗口或选定区域。' },
							{ title: '图片识别', description: '在截图中查找指定图片，把位置和匹配结果交给后续节点。' },
							{ title: '离线文字识别', description: '识别简体中文和英文，不需要另装识别程序。' },
						],
					},
					{
						title: '完成桌面操作',
						items: [
							{ title: '剪贴板', description: '读取或写入文本和图片，在程序之间传递内容。' },
							{ title: '键盘与鼠标', description: '向当前前台窗口发送键盘和鼠标操作。' },
							{ title: '变量与条件', description: '保存前面节点的结果，并按条件选择后续步骤。' },
						],
					},
					{
						title: '保存和复用',
						items: [
							{ title: '可视化编排', description: '直接连接节点的顺序和数据，不必从空白脚本开始。' },
							{ title: '有限循环', description: '重复执行有明确次数或停止边界的步骤。' },
							{ title: '打开与保存', description: '工作流可以保存、再次打开，并在相同环境中继续运行。' },
						],
					},
				],
			},
			{
				type: 'steps',
				id: 'build-workflow',
				title: '从示例开始搭一条流程',
				items: [
					{ title: '安装或解压', description: '下载 Windows x64 安装包，或把便携 ZIP 完整解压。' },
					{ title: '打开示例', description: '先查看内置示例了解节点连接方式，也可以新建空白工作流。' },
					{ title: '添加节点', description: '选择窗口、截图、识别、剪贴板、键鼠输入或流程控制节点。' },
					{ title: '连接并填参数', description: '连接执行顺序与数据端口，再填写窗口、图片、文字、坐标或判断条件。' },
					{ title: '保存后运行', description: '先保存工作流，再运行并观察每个节点的状态与输出。' },
				],
			},
			{
				type: 'facts',
				id: 'files-and-installation',
				title: '安装版、便携版与工作流文件',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11 x64。' },
					{ term: '运行环境', description: '普通使用无需另装 Python、.NET 或 OCR 组件。' },
					{ term: '工作流', description: '文件扩展名为 .workflow.json；引用本地图片时要同时保留图片文件。' },
					{ term: '数据位置', description: '安装版位于 %APPDATA%\\CloudLight Automator，便携版位于程序旁的 data 目录。' },
				],
			},
			{
				type: 'bullets',
				id: 'running-safely',
				title: '运行工作流时请留意',
				tone: 'warning',
				items: [
					'当前执行器不支持并行流程、任意环或无限循环。',
					'键鼠操作会发送到当前前台窗口，运行时不要切换到其他敏感窗口。',
					'文字和图片识别会受到系统缩放、截图范围与图像质量影响，正式使用前应先测试。',
					'当前发布未进行代码签名，Windows 可能显示未知发布者提示。',
				],
			},
		],
	},
	{
		slug: 'cloudlight-soop-drops-miner',
		item: getCatalogItem('cloudlight-soop-drops-miner'),
		pageDescription: '在 Windows 上管理多个 SOOP Live 账号，按掉宝任务选择直播间，并集中查看进度和奖励。',
		sections: [
			{
				type: 'note',
				id: 'one-stream-per-account',
				title: '一个账号同一时间只会观看一个直播间',
				description: '直播间需要符合当前任务规则，任务才会增加进度。存在多个不同任务时，请选择优先任务或手工切换直播间。',
			},
			{
				type: 'feature-groups',
				id: 'accounts-and-drops',
				title: '账号、直播间和掉宝进度',
				intro: ['每个账号使用独立登录会话。工具按任务规则选择直播间，并在一个窗口中显示当前直播、任务进度和已经获得的奖励；它不会下载直播音视频。'],
				groups: [
					{
						title: '选择直播间',
						items: [
							{ title: '多账号运行', description: '分别启动、停止和查看多个账号，也可以统一控制。' },
							{ title: '智能选台', description: '根据任务类型、频道分类和官方频道规则选择直播间。' },
							{ title: '手动选台', description: '粘贴直播间链接或频道 ID，分类不匹配时会显示提示。' },
						],
					},
					{
						title: '查看进度',
						items: [
							{ title: '任务进度', description: '显示当前直播间以及与它匹配的任务进度。' },
							{ title: '奖励背包', description: '刷新已经获得的奖励，并按需复制完整兑换码。' },
							{ title: '运行设置', description: '支持托盘、开机启动、HTTP/HTTPS 代理和主题设置。' },
						],
					},
				],
			},
			{
				type: 'steps',
				id: 'first-run',
				title: '第一次运行',
				items: [
					{ title: '下载并启动', description: '下载 Windows 单文件 EXE，普通使用无需安装 Python。' },
					{ title: '添加账号', description: '完成 SOOP 登录。程序保存登录会话，并在登录后清空界面中的密码字段。' },
					{ title: '选择直播间方式', description: '选择智能选台、手动直播间，或只等待 owesports 官方频道。' },
					{ title: '检查任务进度', description: '启动账号后查看当前直播间和任务进度；没有增长时检查频道分类与任务要求。' },
					{ title: '先停止再退出', description: '结束时先停止运行中的账号会话，再退出程序或系统托盘。' },
				],
			},
			{
				type: 'facts',
				id: 'account-data',
				title: '账号数据与网络',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11。' },
					{ term: '网络', description: '需要访问 SOOP Live 的登录、直播和掉宝服务；代理仅支持 HTTP 或 HTTPS 地址。' },
					{ term: '账号数据', description: '登录会话保存在程序旁的 accounts 文件夹，其中可能包含敏感 Cookie。' },
					{ term: '程序', description: '提供 Windows 单文件 EXE，当前发布未进行代码签名。' },
				],
			},
			{
				type: 'bullets',
				id: 'drops-boundaries',
				title: '掉宝活动的边界',
				tone: 'warning',
				items: [
					'这是非官方工具，与 SOOP Live 官方无关联，也不保证一定获得奖励。',
					'实际进度取决于活动、账号、频道分类和网络状态；平台接口或规则变化后，部分功能可能失效。',
					'accounts 文件夹中的登录会话应像密码一样保管，不要上传或分享。',
					'工具不会绕过验证码、账号限制或平台安全机制。',
				],
			},
		],
	},
	{
		slug: 'microsoft-pinyin-cleaner',
		item: getCatalogItem('microsoft-pinyin-cleaner'),
		pageDescription: '检测并移除 Windows 更新后重新加入当前用户输入法列表的微软拼音，同时保留其他中文输入法。',
		sections: [
			{
				type: 'features',
				id: 'clean-pinyin',
				title: '一键清理微软拼音',
				intro: ['Windows 更新把微软拼音重新加入输入法列表后，可以直接检测并移除。程序是面向 Windows 10/11 x64 的单文件 EXE，使用当前用户权限，依赖系统自带 PowerShell，无需另装 .NET。'],
				layout: 'columns',
				items: [
					{ title: '精确检测', description: '只匹配微软拼音的完整标识，不按模糊名称删除其他输入法。' },
					{ title: '保留备用输入法', description: '确认仍有其他中文输入法，并保证列表不会被清空。' },
					{ title: '只改当前用户', description: '不删除语言包、系统文件或其他输入法。' },
					{ title: '条件不足时停止', description: '读取失败、操作超时或没有备用输入法时不会写入。' },
				],
			},
			{
				type: 'features',
				id: 'automatic-check',
				title: '登录时自动检查',
				intro: ['需要长期处理这个问题时，可以把自动清理加入当前用户启动项。'],
				layout: 'list',
				items: [
					{ title: '延迟执行', description: '登录后等待约 10 秒再检查，减少与系统启动过程冲突。' },
					{ title: '保留结果', description: '记录最近一次自动检查的时间和结果，方便确认是否运行。' },
					{ title: '路径随 EXE', description: '移动或重命名程序后，需要从新位置重新开启自动清理。' },
				],
			},
			{
				type: 'steps',
				id: 'how-to-use',
				title: '使用方法',
				items: [
					{ title: '先准备备用输入法', description: '确认另一个中文输入法已经安装并能正常输入；微软拼音是唯一中文输入法时，程序会拒绝删除。' },
					{ title: '下载后直接运行', description: '打开 MicrosoftPinyinCleaner.exe，点击“立即检测”。' },
					{ title: '确认并移除', description: '检测到微软拼音后执行清理，条件不满足时程序会停止。' },
					{ title: '按需开启自动清理', description: 'Windows 更新以后仍可能重新加入微软拼音；需要时开启登录自动检查。' },
					{ title: '删除前先关闭', description: '不再使用时，先关闭登录自动清理，再删除 EXE。' },
				],
			},
		],
	},
	{
		slug: 'power-settings-manager',
		item: getCatalogItem('power-settings-manager'),
		pageDescription: '查找 Windows 10/11 中被隐藏的高级电源选项，并集中管理显示、隐藏和恢复。',
		sections: [
			{
				type: 'features',
				id: 'find-settings',
				title: '找到被隐藏的电源选项',
				intro: ['工具会读取 Windows 电源配置和注册表，把经典“高级电源设置”里默认隐藏的项目集中列出来。扫描只读取信息，不需要管理员权限。'],
				layout: 'columns',
				items: [
					{ title: '完整扫描', description: '整理设置名称、分组、标识和当前显示状态。' },
					{ title: '搜索与筛选', description: '按名称、分组、标识、显示状态或选中状态缩小列表。' },
					{ title: '中英文名称', description: '尽量合并系统数据，显示便于核对的名称、分组和完整路径。' },
					{ title: '只看目标项目', description: '选择一个或多个设置，再决定显示、隐藏还是恢复。' },
				],
			},
			{
				type: 'features',
				id: 'backup-and-restore',
				title: '修改前先核对和备份',
				layout: 'cards',
				items: [
					{ title: '原值与目标值', description: '确认窗口会显示完整路径、当前值和准备写入的值。' },
					{ title: '修改前备份', description: '记录原值以及该值是否原本存在，便于之后恢复。' },
					{ title: '逐项结果', description: '完成后显示成功、失败、跳过和验证结果，并保留日志。' },
				],
			},
			{
				type: 'steps',
				id: 'change-visibility',
				title: '显示、隐藏或恢复设置',
				items: [
					{ title: '下载并完整解压', description: '把 Windows x64 便携 ZIP 解压到当前用户可写入的文件夹。' },
					{ title: '扫描电源设置', description: '打开主程序并扫描系统，这一步不会写入设置。' },
					{ title: '选择目标项目', description: '用搜索、分组和状态筛选找到需要处理的设置。' },
					{ title: '核对后确认修改', description: '选择显示、隐藏或恢复，检查原值与目标值，再通过本次操作的 UAC 请求。' },
					{ title: '重新打开系统设置', description: '关闭并重新打开 Windows 高级电源设置，检查变化是否生效。' },
				],
			},
			{
				type: 'facts',
				id: 'portable-data',
				title: '便携版和数据目录',
				items: [
					{ term: '系统', description: 'Windows 10 x64 或 Windows 11 x64。' },
					{ term: '下载包', description: '便携 ZIP 已包含运行组件，需要保留主程序和辅助程序。' },
					{ term: '权限', description: '扫描不提权；写入或恢复系统设置时才会请求 UAC。' },
					{ term: 'Data 文件夹', description: '保存在程序目录中，包含快照、备份、日志和配置。' },
				],
			},
			{
				type: 'bullets',
				id: 'before-changing',
				title: '改动系统设置前',
				tone: 'warning',
				items: [
					'只处理自己理解并核对过的电源设置。',
					'不同 Windows 版本、电脑厂商和电源驱动会影响设置是否显示或生效。',
					'不要单独删除辅助程序或 Data 文件夹，否则修改和恢复功能可能无法工作。',
					'当前下载包没有代码签名和自动更新。',
				],
			},
		],
	},
	{
		slug: 'mobile-hotspot-controller',
		item: getCatalogItem('mobile-hotspot-controller'),
		pageDescription: '在设备支持时通过 Wi-Fi Direct 创建不依赖互联网的 Windows 局域网热点。',
		sections: [
			{
				type: 'features',
				id: 'hotspot-modes',
				title: '先分清两种热点模式',
				intro: ['工具会先检查本机能力，再决定可以使用哪种方式。手机、平板或其他设备连接后，可以与电脑组成临时局域网。'],
				layout: 'cards',
				items: [
					{ title: '仅局域网模式', description: '在设备支持时通过 Wi-Fi Direct 创建热点，不需要可共享网络，也不提供互联网访问。' },
					{ title: '系统热点模式', description: '电脑已有可共享网络时，启动或停止 Windows 自带移动热点。' },
					{ title: '自动能力检测', description: '检查系统热点、Wi-Fi Direct、旧版 Hosted Network、无线网卡和驱动。' },
				],
			},
			{
				type: 'features',
				id: 'background-and-diagnostics',
				title: '后台运行和设备诊断',
				layout: 'list',
				items: [
					{ title: '托盘与后台', description: '关闭主窗口后，可以让后台程序继续保持热点。' },
					{ title: '启动设置', description: '设置开机启动、最小化、延迟自动开启和退出行为。' },
					{ title: '诊断报告', description: '复制或导出检测信息，并保留 Windows 返回的错误码。' },
				],
			},
			{
				type: 'steps',
				id: 'create-local-hotspot',
				title: '创建仅局域网热点',
				items: [
					{ title: '下载并运行', description: '下载 Windows 11 x64 单文件程序。' },
					{ title: '先检查设备', description: '打开系统诊断，查看无线设备、当前网络和可用热点方式。' },
					{ title: '填写热点信息', description: '设置热点名称和 8–63 位可打印 ASCII 密码。' },
					{ title: '选择模式', description: '有可共享网络时选系统热点；只需本地通信时选“仅局域网”。' },
					{ title: '启动并检查连接', description: '查看实际使用的方式、连接状态和设备数量；失败时保留错误码和诊断报告。' },
				],
			},
			{
				type: 'facts',
				id: 'device-support',
				title: '设备支持决定能否使用',
				items: [
					{ term: '系统', description: 'Windows 11 x64，最低版本为 build 22000。' },
					{ term: '无线设备', description: '需要 Windows 能识别的 Wi-Fi 设备，具体模式由网卡和驱动决定。' },
					{ term: '程序', description: '发布版是已经包含运行组件的单文件 EXE。' },
					{ term: '数据位置', description: '设置、加密密码、日志和诊断保存在 %AppData%\\MobileHotspotController。' },
				],
			},
			{
				type: 'bullets',
				id: 'no-internet',
				title: '看到“无互联网”时',
				items: [
					'“仅局域网”模式本来就不提供互联网；只要设备仍能与电脑通信，就属于正常状态。',
					'Wi-Fi Direct 是否可用完全取决于无线网卡、驱动和系统能力。',
					'热点无法启动时先查看诊断和错误码，不建议直接关闭防火墙或重置网络。',
				],
			},
		],
	},
	{
		slug: 'tdm-claim-toggle-patcher',
		item: getCatalogItem('tdm-claim-toggle-patcher'),
		pageDescription: '为 TwitchDropsMiner 增加可关闭的自动领取开关，并在修改源码前检查兼容性和创建备份。',
		sections: [
			{
				type: 'features',
				id: 'claim-toggle',
				title: '给自动领取加一个开关',
				intro: ['工具会修改你选择的 TwitchDropsMiner 源码，在设置中加入“自动领取掉宝”开关。关闭后不再提交领取操作，观看和进度等其他流程仍会继续。'],
				layout: 'list',
				items: [
					{ title: '图形界面', description: '选择源码目录后完成检查、预览、应用、状态查看和恢复。' },
					{ title: '命令行', description: '需要批量或脚本化使用时，可以执行同样的操作。' },
					{ title: '可恢复修改', description: '工具保留修改前的文件，之后可以恢复最近一次补丁。' },
				],
			},
			{
				type: 'features',
				id: 'before-writing',
				title: '写入源码前先检查',
				layout: 'cards',
				items: [
					{ title: '兼容性检查', description: '确认设置、领取和调度位置符合已知源码布局。' },
					{ title: '干运行预览', description: '先列出准备修改的文件，出现不支持或歧义时不会继续。' },
					{ title: '备份与冲突保护', description: '记录修改前后的文件状态，恢复前检查文件是否被再次改动。' },
				],
			},
			{
				type: 'steps',
				id: 'apply-and-restore',
				title: '检查、应用与恢复',
				items: [
					{ title: '打开补丁工具', description: '下载 Windows 单文件程序，或使用 Python 3.10 及更高版本从源码运行。' },
					{ title: '选择可信源码目录', description: '选择完整的 TwitchDropsMiner 源码，不要选择打包后的 EXE 或用户数据目录。' },
					{ title: '检查并预览', description: '确认工具能够识别当前版本，再用干运行查看准备修改的文件。' },
					{ title: '应用补丁', description: '确认后写入；工具会先创建备份，再检查写入结果。' },
					{ title: '更新前恢复', description: '更新 TwitchDropsMiner 前先恢复补丁，更新后再重新检查兼容性。' },
				],
			},
			{
				type: 'facts',
				id: 'requirements',
				title: '需要准备什么',
				items: [
					{ term: '下载版', description: 'Windows 单文件 EXE，包含图形界面和命令行功能，不需要管理员权限。' },
					{ term: '目标源码', description: '需要完整且可信的 TwitchDropsMiner 源码目录，不能直接修改已打包 EXE。' },
					{ term: '源码运行', description: '需要 Python 3.10 或更高版本。' },
					{ term: '本地设置', description: '保存在 %LOCALAPPDATA%\\TDMClaimTogglePatcher。' },
				],
			},
			{
				type: 'bullets',
				id: 'before-updating',
				title: '更新 TwitchDropsMiner 前',
				tone: 'warning',
				items: [
					'TwitchDropsMiner 更新后源码结构可能变化，每次更新都应重新检查。',
					'关闭自动领取后，要求先领取前置奖励的活动可能无法继续推进。',
					'构建目标程序会运行目标仓库脚本并安装依赖，只能对可信源码执行。',
					'不要分享 TwitchDropsMiner 的 Cookie、令牌、代理凭据或用户数据。',
				],
			},
		],
	},
	{
		slug: 'cloudlight-codex-bridge',
		item: getCatalogItem('cloudlight-codex-bridge'),
		pageDescription: '把本机 Codex 会话连接到 QQ 官方机器人或 Telegram，远程发送任务、接收最终回复并继续已有会话。',
		sections: [
			{
				type: 'features',
				id: 'remote-channels',
				title: '远程连接 Codex',
				intro: ['电脑上的 Codex 已经登录并可用后，可以把现有会话连接到 QQ 或 Telegram。离开电脑时，也能查看会话、发送后续任务并接收最终回复。'],
				layout: 'cards',
				items: [
					{ title: 'QQ 官方机器人', description: '处理私聊和群聊中 @机器人的文字消息，并可限制允许使用的账号或群。' },
					{ title: 'Telegram', description: '通过 Telegram Bot 查看会话、绑定目标会话并发送后续消息。' },
					{ title: '稳定会话编号', description: '为发现的 Codex 会话分配易于输入的 #N 编号，远程消息可明确指定目标。' },
				],
			},
			{
				type: 'screenshots',
				id: 'desktop-and-chat',
				title: '桌面端和聊天端',
				intro: ['桌面端集中显示 Codex、远程渠道和消息同步状态；聊天端使用同一个会话编号继续任务。'],
				indexes: [1, 2],
			},
			{
				type: 'features',
				id: 'sessions-and-sync',
				title: '会话绑定与消息同步',
				layout: 'list',
				items: [
					{ title: '查看和切换会话', description: '列出最近会话、检查当前绑定，并切换聊天端后续消息的目标。' },
					{ title: '发送与停止任务', description: '在已有会话中继续对话；由当前远程地址发起的任务可在允许时停止。' },
					{ title: '只发最终回复', description: '一次任务完成后，聊天端收到一条最终回答，不被过程消息连续刷屏。' },
				],
			},
			{
				type: 'steps',
				id: 'getting-started',
				title: '怎么开始使用',
				items: [
					{ title: '安装桌面端', description: '优先使用 0.7.1 安装版；便携版需要完整解压，如果提示缺少运行环境请改用安装版。' },
					{ title: '确认本机 Codex 可用', description: '先完成 Codex 登录；没有自动找到时，可以在设置中指定 codex.exe。' },
					{ title: '添加远程渠道', description: '选择 Telegram 或 QQ 官方机器人，填写对应平台提供的机器人凭据。' },
					{ title: '测试并绑定会话', description: '测试凭据和网络，在聊天端用 #N 指定会话，或把当前聊天绑定到一个现有会话。' },
					{ title: '从聊天端继续任务', description: '发送普通消息，任务完成后接收最终回复。' },
				],
			},
			{
				type: 'facts',
				id: 'connection-requirements',
				title: '安装与连接要求',
				items: [
					{ term: '系统', description: 'Windows 10 1809 或更高版本，x64。' },
					{ term: 'Codex', description: '已经安装并能正常使用 Codex CLI 或 Codex Desktop，且已完成登录。' },
					{ term: '机器人', description: '需要自行创建 Telegram 或 QQ 机器人，并能够连接对应平台；QQ 还要配置消息事件权限和允许访问的身份。' },
					{ term: '当前版本', description: '0.7.1 正式版；完整安装包已包含 .NET 8 Windows 桌面运行环境。' },
				],
			},
			{
				type: 'bullets',
				id: 'remote-boundaries',
				title: '远程端有哪些边界',
				tone: 'warning',
				items: [
					'远程端不能批准 Codex 的 Approval，也不能新建、Fork 或自动排队会话。',
					'QQ 官方机器人当前只处理文字私聊和群聊 @消息，不支持图片、文件、语音或视频。',
					'Bridge 不会替你登录 Codex，也不会修改当前会话的模型、权限或安全设置。',
					'0.7.1 安装包尚未进行商业代码签名，也不包含自动更新。',
				],
			},
			{
				type: 'links',
				id: 'source-and-release',
				title: '源码与发布记录',
				items: [
					{ label: '查看 v0.7.1 Release', href: 'https://github.com/yundan125/Codex-Bridge/releases/tag/v0.7.1' },
					{ label: '查看 GitHub 仓库', href: 'https://github.com/yundan125/Codex-Bridge' },
				],
			},
		],
	},
	{
		slug: 'twitter-x-media-renamer',
		item: getCatalogItem('twitter-x-media-renamer'),
		pageDescription: '从下载文件名识别 Twitter/X 帖子，根据帖子正文预览并批量重命名图片和视频。',
		sections: [
			{
				type: 'features',
				id: 'rename-rules',
				title: '文件会怎样改名',
				intro: ['选择媒体文件夹后，程序会从文件名中识别 Twitter/X 帖子 ID，读取公开可访问的帖子正文，再生成更容易辨认的新文件名。'],
				layout: 'columns',
				items: [
					{ title: '识别帖子 ID', description: '从文件名中的 17～20 位数字识别帖子，并尽量同时识别用户名。' },
					{ title: '使用帖子正文', description: '去掉不适合文件名的内容，把公开正文整理进目标名称。' },
					{ title: '保留媒体顺序', description: '同一帖子有多个媒体时，自动追加 _01、_02 等编号。' },
					{ title: '避免重名覆盖', description: '同时检查磁盘已有文件和当前批次，发生重名时自动追加后缀。' },
				],
			},
			{
				type: 'features',
				id: 'preview',
				title: '改名前可以逐项确认',
				intro: ['所有结果都会先显示在表格中，确认后才会修改文件。'],
				layout: 'list',
				items: [
					{ title: '预览目标名称', description: '先核对程序识别出的用户名、帖子 ID 和新文件名。' },
					{ title: '手工编辑', description: '双击修改目标名称，也可以把单个文件标记为跳过。' },
					{ title: '统一执行', description: '最后再次确认文件数量，再批量完成改名。' },
				],
			},
			{
				type: 'features',
				id: 'supported-files',
				title: '支持哪些下载文件',
				layout: 'cards',
				items: [
					{ title: '图片', description: 'JPG、PNG、WebP、GIF 和 AVIF。' },
					{ title: '视频', description: 'MP4、WebM、MOV 和 M4V。' },
					{ title: '原文件名', description: '需要包含可识别的 17～20 位帖子 ID。' },
				],
			},
			{
				type: 'steps',
				id: 'how-to-use',
				title: '使用方法',
				items: [
					{ title: '选择媒体文件夹', description: '在 Windows 10/11 x64 上运行单文件 EXE，选择文件夹，需要时勾选包含子文件夹。' },
					{ title: '扫描媒体文件', description: '检查程序识别出的用户名和帖子 ID。' },
					{ title: '获取帖子正文', description: '联网读取公开内容，为能够访问的帖子生成目标名称。' },
					{ title: '调整预览', description: '双击编辑新文件名，或跳过不想修改的文件。' },
					{ title: '批量改名', description: '点击“全部重命名”，确认文件数量后执行。' },
				],
			},
			{
				type: 'bullets',
				id: 'when-skipped',
				title: '哪些文件会保持原样',
				items: [
					'没有可识别帖子 ID 的文件不会被修改。',
					'已删除、受保护或无法公开访问的帖子不能生成正文文件名。',
					'正文读取依赖 FxTwitter 或 VxTwitter 的可用性和返回格式，服务不可用时可能获取失败。',
					'当前程序没有商业代码签名，Windows 首次运行时可能显示 SmartScreen 提示。',
				],
			},
		],
	},
	{
		slug: 'heybox-post-exporter',
		item: getCatalogItem('heybox-post-exporter'),
		pageDescription: '连接日常使用的 Microsoft Edge，把小黑盒帖子、评论、楼中楼和图片保存到电脑。',
		sections: [
			{
				type: 'features',
				id: 'saved-content',
				title: '可以保存哪些内容',
				intro: ['输入小黑盒帖子链接后，可以把原帖、评论、楼中楼和图片一起保存到电脑。工具会继续使用页面上的加载入口，尽量取回当前账号能够看到的完整讨论。'],
				layout: 'columns',
				items: [
					{ title: '原帖', description: '保存标题、作者、发布时间、正文、图片和原帖链接。' },
					{ title: '评论与楼中楼', description: '保存一级评论、楼中楼、置顶标记、时间、点赞和页面可读取的回复。' },
					{ title: '帖子图片', description: '把帖子、评论和回复中的图片下载到同一个本地目录。' },
					{ title: '后续回复', description: '继续点击页面已有的加载和展开入口，直到没有更多可读取内容。' },
				],
			},
			{
				type: 'features',
				id: 'export-formats',
				title: '导出格式',
				layout: 'cards',
				items: [
					{ title: 'HTML', description: '直接在浏览器中阅读，正文、图片、评论和楼中楼都在一个页面里。' },
					{ title: 'Markdown', description: '保留原帖、评论和缩进回复，方便搜索和继续编辑。' },
					{ title: 'JSON', description: '保存完整结构化数据，适合后续整理或自行处理。' },
				],
			},
			{
				type: 'steps',
				id: 'export-post',
				title: '怎么导出帖子',
				items: [
					{ title: '准备 Edge', description: '打开日常使用的 Microsoft Edge，在地址栏进入 edge://inspect，并允许当前浏览器实例进行远程调试。' },
					{ title: '打开软件', description: '运行 HeyboxPostExporter.exe。Edge 弹出授权提示时，手工点击允许。' },
					{ title: '输入帖子链接', description: '等界面显示浏览器已连接，再粘贴普通帖子链接或包含 link_id 的分享链接。' },
					{ title: '选择导出内容', description: '勾选需要的格式和图片，并确认保存目录。' },
					{ title: '开始导出', description: '点击“开始导出”。如果遇到验证码，回到 Edge 手工完成；结束后可直接打开生成的帖子目录。' },
				],
			},
			{
				type: 'facts',
				id: 'preparation',
				title: '使用前准备',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11 x64。' },
					{ term: '浏览器', description: 'Microsoft Edge，并在 edge://inspect 中允许当前实例进行远程调试。' },
					{ term: 'Node.js', description: '需要安装 Node.js 和 npx；首次连接时需要联网准备浏览器连接组件。' },
					{ term: '保存位置', description: 'EXE 所在目录需要可写，用于保存设置和日志；帖子可导出到其他目录。' },
				],
			},
			{
				type: 'bullets',
				id: 'notes',
				title: '注意事项',
				tone: 'warning',
				items: [
					'验证码和访问频率限制需要在 Edge 中手工处理，软件不会自动绕过。',
					'被删除且服务端不再返回的评论无法恢复。',
					'小黑盒网页结构或接口变化后，部分内容可能暂时无法导出。',
				],
			},
		],
	},
	{
		slug: 'cloudlight-overwatch-youtube-watcher',
		item: getCatalogItem('cloudlight-overwatch-youtube-watcher'),
		pageDescription: '定时查找指定守望先锋 YouTube 频道的直播，并用本机 Chrome 或 Brave Profile 打开和维持播放。',
		sections: [
			{
				type: 'features',
				id: 'find-live-streams',
				title: '自动寻找直播',
				intro: ['软件会定时检查已启用的守望先锋 YouTube 频道，确认公开信息显示正在直播后，用本机 Chrome 或 Brave 打开页面。'],
				layout: 'cards',
				items: [
					{ title: '自动检测频道', description: '依次检查已启用频道，只在明确显示正在直播时打开。' },
					{ title: '手动 URL 模式', description: '自动检测暂时不可用时，可以粘贴 youtube.com/watch 或 youtu.be 地址。' },
					{ title: '维持播放', description: '浏览器意外退出后重新打开直播，并尝试恢复意外暂停。' },
				],
			},
			{
				type: 'features',
				id: 'browser-profiles',
				title: '设置浏览器 Profile',
				intro: ['每个 Profile 独立保存 Google 和 YouTube 登录状态，可以分别启动。软件不会读取或填写账号密码。'],
				layout: 'columns',
				items: [
					{ title: 'Chrome 或 Brave', description: '自动查找本机浏览器，也可以手工选择浏览器 EXE。' },
					{ title: '可见登录窗口', description: 'Google / YouTube 登录由用户本人在真实浏览器页面中完成。' },
					{ title: '独立登录状态', description: '不同 Profile 可以保存不同账号，并按需分别开始观看。' },
					{ title: '本地 Profile 数据', description: '保存在软件目录的 profiles 文件夹；删除 Profile 会同时删除对应登录数据。' },
				],
			},
			{
				type: 'steps',
				id: 'start-watching',
				title: '开始观看',
				items: [
					{ title: '下载并打开程序', description: '把当前 Windows 程序放到普通可写目录后运行。' },
					{ title: '选择浏览器', description: '选择 Chrome 或 Brave；没有自动识别时手工选择浏览器 EXE。' },
					{ title: '准备 Profile', description: '打开 Profile 登录窗口，由本人完成 Google 和 YouTube 登录，再重新打开一次确认状态仍然保留。' },
					{ title: '选择观看模式', description: '自动模式启用需要检查的频道；手动模式直接粘贴直播地址。' },
					{ title: '检查真实播放页面', description: '点击开始后确认没有验证码、地区限制、年龄提示或 Cookie 提示阻挡播放。' },
				],
			},
			{
				type: 'facts',
				id: 'browser-requirements',
				title: '浏览器和本地数据',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11 x64。' },
					{ term: '浏览器', description: '已经安装并更新的 Google Chrome 或 Brave。' },
					{ term: '账号登录', description: '由用户本人在可见窗口中登录，软件不会读取或填写密码。' },
					{ term: 'Profile', description: '保存在软件目录的 profiles 文件夹。' },
				],
			},
			{
				type: 'bullets',
				id: 'event-rules',
				title: '观看活动仍以官方规则为准',
				tone: 'warning',
				items: [
					'请自行确认活动时间、合资格频道和账号连接要求，并在可见浏览器中检查直播确实持续播放。',
					'软件只能帮助打开和维持直播，不保证奖励、观看时长或活动资格一定被平台记录。',
					'YouTube 页面和公开信息变化后，自动检测可能失效；此时可改用手动 URL 模式。',
					'同时运行多个 Profile 会增加内存和网络占用，首次使用建议先用一个账号确认。',
				],
			},
		],
	},
	{
		slug: 'heybox-post-export-userscript',
		item: getCatalogItem('heybox-post-export-userscript'),
		pageDescription: '直接在小黑盒帖子页面展开全文、全部评论和楼中楼，并导出原网页或纯净阅读版 HTML。',
		sections: [
			{
				type: 'features',
				id: 'in-page-export',
				title: '直接在帖子页展开和导出',
				intro: ['这个用户脚本会在小黑盒帖子页面加入一个操作面板，不需要安装桌面程序。它和 HeyboxPostExporter 是两种不同方案：脚本直接处理当前浏览器页面，主要导出原网页或纯净阅读版 HTML。'],
				layout: 'list',
				items: [
					{ title: '运行页面', description: '当前只匹配 https://www.xiaoheihe.cn/app/bbs/link/* 帖子页面。' },
					{ title: '操作入口', description: '使用页面右下角面板开始展开、选择图片选项并导出。' },
					{ title: '适合偶尔保存', description: '打开目标帖子后直接处理，不需要另外准备桌面运行环境。' },
				],
			},
			{
				type: 'steps',
				id: 'install-and-use',
				title: '安装与使用',
				items: [
					{ title: '安装脚本管理器', description: '先在桌面浏览器中安装 Tampermonkey、Violentmonkey 或其他兼容扩展。' },
					{ title: '安装脚本', description: '点击本页“安装脚本”，核对名称、匹配页面和图片访问权限。' },
					{ title: '打开小黑盒帖子', description: '进入 www.xiaoheihe.cn/app/bbs/link/ 下的帖子详情页。' },
					{ title: '展开并导出', description: '用右下角面板开始完整展开，选择是否嵌入图片，再下载原网页或阅读版。' },
				],
			},
			{
				type: 'features',
				id: 'automatic-expansion',
				title: '脚本会自动展开什么',
				layout: 'columns',
				items: [
					{ title: '帖子全文', description: '识别“展开全文”“查看全文”等入口，并解除文字截断。' },
					{ title: '更多评论', description: '继续滚动并点击加载入口，直到页面稳定或需要人工处理。' },
					{ title: '楼中楼回复', description: '处理“查看全部回复”“查看更多回复”等入口，并统计已经识别的回复。' },
					{ title: '长评论', description: '展开页面中折叠的长评论，尽量保留当前账号能看到的文字。' },
				],
			},
			{
				type: 'features',
				id: 'html-exports',
				title: '两种 HTML 导出方式',
				layout: 'cards',
				items: [
					{ title: '原网页', description: '移除脚本面板等注入内容后，保存当前已经展开的网页快照。' },
					{ title: '纯净阅读版', description: '按原帖、评论和楼中楼重新组织，生成更适合本地阅读的页面。' },
					{ title: '离线图片', description: '可把允许读取的图片嵌入 HTML；失败时保留原在线地址。' },
				],
			},
			{
				type: 'bullets',
				id: 'export-notes',
				title: '导出时需要注意',
				items: [
					'小黑盒页面结构或按钮文字变化后，部分展开操作可能暂时失效。',
					'遇到验证码或访问过于频繁时，脚本会暂停，需要手工验证后继续。',
					'脚本只能导出当前账号和页面能够加载的内容，已删除或服务端未返回的回复无法恢复。',
					'离线图片下载失败时会保留在线 URL，因此文件不一定能完全离线显示所有图片。',
				],
			},
		],
	},
	{
		slug: 'shanda-passport-login-helper',
		item: getCatalogItem('shanda-passport-login-helper'),
		pageDescription: '在盛大通行证登录页自动勾选协议、切换一键登录方式，并填写保存在浏览器脚本管理器中的账号。',
		sections: [
			{
				type: 'features',
				id: 'automatic-actions',
				title: '打开登录页后会自动做什么',
				intro: ['脚本运行在 Tampermonkey、Violentmonkey 等用户脚本管理器中，当前只匹配 *://login.u.sdo.com/*，本身没有跨域网络请求权限。'],
				layout: 'columns',
				items: [
					{ title: '勾选协议', description: '找到登录协议后自动勾选；使用前仍应自行阅读协议内容。' },
					{ title: '切换登录方式', description: '自动点击“一键登录”切换项。' },
					{ title: '填写保存账号', description: '写入已经保存的账号，并触发页面需要的输入事件。' },
					{ title: '等待页面重绘', description: '页面加载后的前 30 秒内继续检查需要的元素。' },
				],
			},
			{
				type: 'steps',
				id: 'install-and-configure',
				title: '安装和设置账号',
				items: [
					{ title: '安装脚本管理器', description: '先安装 Tampermonkey、Violentmonkey 或其他兼容扩展。' },
					{ title: '安装脚本', description: '点击本页“安装脚本”，核对名称、匹配范围和权限。' },
					{ title: '保存账号', description: '从脚本菜单选择“设置登录账号”，输入需要自动填写的账号。' },
					{ title: '打开登录页', description: '访问 login.u.sdo.com，脚本会尝试完成协议勾选、方式切换和账号填写。' },
					{ title: '本人完成登录', description: '检查页面状态，完成验证码、短信或手机确认，并决定是否提交登录。' },
				],
			},
			{
				type: 'features',
				id: 'local-account',
				title: '账号保存在脚本管理器里',
				layout: 'list',
				items: [
					{ title: '只保存账号字符串', description: '不读取或保存密码，数据留在当前浏览器的脚本管理器中。' },
					{ title: '随时清除', description: '从脚本菜单清空保存值和当前页面输入框，也可以在设置账号时提交空内容。' },
				],
			},
			{
				type: 'bullets',
				id: 'manual-login',
				title: '脚本不会替你登录',
				tone: 'warning',
				items: [
					'脚本不会填写密码、绕过验证码或安全验证，也不会点击最终登录按钮。',
					'这是非官方脚本，与盛趣游戏、盛大网络及登录平台无官方关联。',
					'登录页结构变化后，自动操作可能暂时失效。',
					'不要在公共电脑、共享浏览器配置或不受信任的设备上保存账号。',
				],
			},
		],
	},
];
