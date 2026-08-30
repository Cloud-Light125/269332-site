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
		slug: 'cloudlight-blizzard',
		item: getCatalogItem('cloudlight-blizzard'),
		pageDescription: 'CloudLight Blizzard 是一款 Windows 工具，用于管理多个 Battle.net 账号、切换《守望先锋》国服 / 国际服本地文件，并集中管理 SOOP、YouTube 与 Twitch 掉宝和观赛。',
		sections: [
			{
				type: 'features',
				id: 'battle-net-accounts',
				title: '多个 Battle.net 账号快速切换',
				intro: ['把日常使用的 Battle.net 账号集中保存到账号列表中，再用名称、备注和国服 / 国际服标签区分。需要换号时，从账号卡片直接切换。'],
				layout: 'columns',
				items: [
					{ title: '账号列表', description: '当前账号和已保存账号放在同一页，切换入口和状态一眼可见。' },
					{ title: '名称与备注', description: '给账号设置容易识别的名称和备注，不必只靠 BattleTag 分辨。' },
					{ title: '区服标签', description: '把每个账号标记为国服或国际服，作为后续区服联动和战绩来源的依据。' },
					{ title: '直接切换', description: '从目标账号卡片开始切换，完成后继续打开 Battle.net。' },
				],
			},
			{
				type: 'features',
				id: 'local-region-files',
				title: '国服 / 国际服不再反复更新差异文件',
				intro: [
					'《守望先锋》国服和国际服存在不同的本地文件。正常直接跨区时，Battle.net 往往会再次更新一部分差异内容；在实际使用场景中通常约为 200MB，具体大小会随游戏版本变化。',
					'首次完成国服和国际服准备后，CloudLight Blizzard 会保存两端真正不同的本地文件。以后切换时直接恢复本机对应版本，减少这部分重复下载。',
					'这项功能的取舍很直接：用一些本地磁盘空间，换取更少的重复下载。它不会替代游戏正常更新；游戏版本明显变化后，可能需要重新准备区服文件。',
				],
				layout: 'list',
				items: [
					{ title: '先准备两端', description: '按区服文件页的提示，让 Battle.net 完成一次真实的国服与国际服准备。' },
					{ title: '保留真实差异', description: '准备完成后长期保存两端真正不同的文件，不保留两个完整游戏副本。' },
					{ title: '以后本地恢复', description: '需要跨区时直接恢复目标区服文件，再继续启动 Battle.net。' },
				],
			},
			{
				type: 'screenshots',
				id: 'region-files-screen',
				title: '区服文件准备状态一目了然',
				indexes: [1],
			},
			{
				type: 'features',
				id: 'account-region-link',
				title: '账号和区服一起切换',
				intro: ['账号的国服 / 国际服标签会直接参与切换流程。选择目标账号后，软件会自动恢复对应的《守望先锋》区服文件，再继续打开 Battle.net，不必先换账号、再单独处理区服。'],
				layout: 'list',
				items: [
					{ title: '切到国服账号', description: '恢复账号后自动切换到已经准备好的国服本地文件。' },
					{ title: '切到国际服账号', description: '恢复账号后自动切换到已经准备好的国际服本地文件。' },
				],
			},
			{
				type: 'feature-groups',
				id: 'drops-and-watching',
				title: 'SOOP、YouTube、Twitch 集中管理',
				intro: [
					'“掉宝”是统一的一级页面，可以在同一个入口查看三个平台的账号、观看状态和下一步操作。全局代理也在这里共用。',
					'如果以前使用过对应的独立掉宝工具，可以从掉宝页面导入已有数据。',
				],
				groups: [
					{
						title: 'SOOP',
						items: [
							{ title: '多个账号', description: '添加并管理多个 SOOP 账号，分别查看可用任务和运行状态。' },
							{ title: '自动或手动选台', description: '按任务自动寻找直播间，也可以指定直播间并调整选台策略。' },
							{ title: '进度与奖励', description: '查看掉宝任务、进度和背包奖励，按需开启自动领取并调整轮询设置。' },
						],
					},
					{
						title: 'YouTube',
						items: [
							{ title: 'Chrome / Brave Profile', description: '为观看账号选择独立的 Chrome 或 Brave Profile。' },
							{ title: '自动找直播', description: '自动寻找指定频道的直播，也可以手动输入直播 URL。' },
							{ title: '观看记录', description: '设置静音和播放恢复，并查看实际观看时间与历史记录。' },
						],
					},
					{
						title: 'Twitch',
						items: [
							{ title: 'Campaign / Inventory', description: '登录 Twitch 后查看可用 Campaign、Inventory 和掉宝进度。' },
							{ title: '频道策略', description: '选择和管理直播频道，设置 Priority、Exclude 和观看优先方式。' },
							{ title: '检查与领取', description: '检查可用 Drop、查看连接状态，并按需要开关自动领取。' },
						],
					},
				],
			},
			{
				type: 'screenshots',
				id: 'drops-screen',
				title: '三个平台共用一个掉宝入口',
				indexes: [2],
			},
			{
				type: 'features',
				id: 'career-stats',
				title: '查看国服与国际服战绩',
				intro: ['战绩页会根据已保存账号绑定的区服自动选择来源，不需要重复切换国服 / 国际服查询模式。'],
				layout: 'columns',
				items: [
					{ title: '国服账号', description: '查看对应的国服战绩、英雄和比赛数据。' },
					{ title: '国际服账号', description: '查询暴雪公开生涯；是否能显示取决于玩家的公开生涯状态。' },
				],
			},
			{
				type: 'features',
				id: 'daily-settings',
				title: '日常设置',
				intro: ['账号、区服和掉宝功能共用同一套应用设置，不需要分别维护多个工具。'],
				layout: 'columns',
				items: [
					{ title: '全局代理', description: '为 SOOP、YouTube 与 Twitch 共用 HTTP / HTTPS 代理，并可设置代理失败时是否直连。' },
					{ title: '托盘与开机启动', description: '按习惯选择关闭到托盘、启动时进入托盘和开机自动启动。' },
					{ title: '明暗主题', description: '在浅色和深色界面之间切换。' },
					{ title: '统一数据目录', description: '设置、账号、日志和掉宝数据集中保存在 CloudLight Blizzard 数据目录；区服文件位置可以单独选择。' },
				],
			},
			{
				type: 'screenshots',
				id: 'settings-screen',
				title: '代理、托盘与更新都在设置页',
				indexes: [3],
			},
			{
				type: 'steps',
				id: 'getting-started',
				title: '开始使用',
				items: [
					{ title: '安装并打开软件', description: '下载 Windows x64 安装包，安装后启动 CloudLight Blizzard。' },
					{ title: '保存 Battle.net 账号', description: '在账号页保存当前账号；登录其它账号后继续保存。' },
					{ title: '设置名称和区服', description: '为每个账号填写便于识别的名称、备注，以及国服或国际服归属。' },
					{ title: '准备国服与国际服文件', description: '需要跨区时，在区服文件页按提示完成一次双端准备。' },
					{ title: '直接切换账号和区服', description: '以后从账号卡片点击“切换”，账号与对应区服文件会一起处理。' },
					{ title: '选择掉宝平台', description: '需要观赛或掉宝时，进入“掉宝”页面选择 SOOP、YouTube 或 Twitch。' },
					{ title: '按账号查看战绩', description: '在战绩页选择已保存账号，查看自动匹配区服来源的数据。' },
				],
			},
			{
				type: 'facts',
				id: 'requirements-and-data',
				title: '运行要求与注意事项',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11 x64。' },
					{ term: '运行环境', description: '.NET 8 Windows Desktop Runtime。' },
					{ term: 'Battle.net', description: '账号管理需要本机安装 Battle.net。' },
					{ term: '守望先锋', description: '使用国服 / 国际服文件切换时，需要本机已经安装《守望先锋》。' },
					{ term: '准备空间', description: '首次准备两端文件需要一定临时磁盘空间；区服差异文件也会长期占用本地空间。' },
					{ term: '游戏更新', description: '游戏版本明显变化后，可能需要重新准备区服文件。' },
					{ term: '国际服战绩', description: '国际服生涯数据取决于 BattleTag 和公开生涯状态。' },
					{ term: '掉宝平台', description: '首次使用可能需要登录对应平台账号；YouTube 观看还需要准备 Chrome 或 Brave Profile。' },
				],
			},
			{
				type: 'features',
				id: 'project-origin',
				title: '项目来源与开源',
				intro: ['CloudLight Blizzard 起源于开源项目 BnetSwitch，后续重构了大量账号、区服、界面和数据逻辑，并继续按照 GPLv3 开源。源码与发布记录可从页面顶部进入 GitHub 查看。'],
				layout: 'list',
				items: [
					{ title: 'GNU GPL v3.0', description: '项目源码、许可证与版本发布记录都保留在 GitHub 仓库中。' },
				],
			},
		],
	},
	{
		slug: 'cloudlight-xiaomi',
		item: getCatalogItem('cloudlight-xiaomi'),
		pageDescription: '查看 Xiaomi 账号下的设备，并记录小米路由器设备的在线 / 离线历史、时长和时间轴；支持设备开关控制、主体管理与 QQ 提醒。',
		sections: [
			{
				type: 'features',
				id: 'xiaomi-account-devices',
				title: '先看当前 Xiaomi 账号下的设备',
				intro: [
					'新版主界面从 Xiaomi 账号下的设备开始，而不只是一个路由器 Presence 监控页。设备、QQ提醒和设置都有自己的入口；刷新后可以同时看到账号设备和当前路由器状态。',
				],
				layout: 'cards',
				items: [
					{ title: '账号设备列表', description: '设备卡片显示名称、设备类型、家庭 / 房间、型号、在线状态和是否为共享设备；类型包括路由器、智能开关、灯、传感器、空调、摄像头、扫地机器人、门锁、插座等。' },
					{ title: '筛选和搜索', description: '可以按全部、在线、离线或未知筛选，也可以按设备名称、型号、房间或家庭搜索。' },
					{ title: '路由器入口', description: '路由器设备可以进入路由器 Presence，查看连接到该路由器的网络设备和历史记录。' },
				],
			},
			{
				type: 'features',
				id: 'device-controls',
				title: '支持能力的设备可以直接操作',
				intro: [
					'软件会先检查设备是否提供可读取、可写入的电源能力。满足条件且当前可用的非路由器设备，可以直接在设备卡片中执行打开 / 关闭，随后读取真实状态确认结果。',
				],
				layout: 'columns',
				items: [
					{ title: '状态与能力', description: '设备详情显示当前状态和可读属性；只有实际提供相应能力的设备才会出现操作入口。' },
					{ title: '打开 / 关闭', description: '对支持电源控制的智能开关、灯、插座等设备执行开关操作，离线时不会强行发送。' },
					{ title: '操作后确认', description: '执行后重新读取设备状态，让列表显示设备实际返回的结果。' },
				],
			},
			{
				type: 'features',
				id: 'router-presence',
				title: '路由器 Presence 继续记录联网历史',
				intro: [
					'账号设备列表之外，路由器仍然有独立的 Presence 页面。它会定时观察路由器可见的网络设备，把上线、离线变化保存在电脑上。',
				],
				layout: 'columns',
				items: [
					{ title: '网络设备观察', description: '路由器页显示在线、离线或未知状态，也能搜索名称、备注、关联信息、MAC 和 IP。' },
					{ title: '当前连接', description: '每张卡片显示在线时长、当前连接情况和关联设备，方便先看现在谁还连着路由器。' },
					{ title: '主体归并', description: '把同一个人的多个设备归到一个主体后，可以从主体层面查看状态和提醒。' },
				],
			},
			{
				type: 'screenshots',
				id: 'router-presence-screen',
				title: '路由器设备有自己的 Presence 页面',
				intro: ['路由器 Presence 页面保留了在线 / 离线筛选、在线时长、当前连接和关联设备信息。'],
				indexes: [2],
			},
			{
				type: 'features',
				id: 'subject-history',
				title: '主体、在线时长和时间轴',
				intro: [
					'打开主体详情后，可以把当前设备状态和已经记录的历史放在一起看。时间轴只使用实际采集到的数据，方便分辨“离线”和“那段时间没有监控”。',
				],
				layout: 'columns',
				items: [
					{ title: '四个时间范围', description: '分别查看最近 24 小时、3 天、7 天和 30 天的在线统计与累计时长。' },
					{ title: '时间轴与活动', description: '时间轴区分在线、离线和没有记录的时间段，并列出最近的状态变化。' },
					{ title: '未知空档', description: '电脑关闭、网络中断或软件暂停时，相关时间会标为 Unknown / 无法确认，不会被误算成在线或离线。' },
					{ title: '主体管理', description: '在主体详情中管理关联设备、修改名称和备注，也可以拆分或解散主体。' },
				],
			},
			{
				type: 'screenshots',
				id: 'subject-history-screen',
				title: '统计、时间轴和最近活动放在一起',
				intro: ['主体详情页展示关联设备、24 小时 / 3 天 / 7 天 / 30 天统计、在线时间分布、最近活动和未记录的时间段。'],
				indexes: [1],
			},
			{
				type: 'features',
				id: 'qq-reminders',
				title: 'QQ提醒现在是独立入口',
				intro: [
					'QQ提醒不再藏在普通设置说明里。进入独立的 QQ提醒 页面，可以配置 Bot、测试连接、指定接收目标并管理自动提醒规则。',
				],
				layout: 'cards',
				items: [
					{ title: '连续状态提醒', description: '为主体添加连续在线或连续离线阈值，规则可以单独启用或停用，达到条件后发送一次提醒。' },
					{ title: '异常提醒', description: '可以接收 QQ Bot 连接失败和恢复等异常状态提醒，并查看最近通知记录。' },
					{ title: '选择接收目标', description: '支持配置 QQ 私聊或群聊接收目标，使用 QQ 开放平台提供的 OpenID。' },
				],
			},
			{
				type: 'screenshots',
				id: 'qq-reminder-screen',
				title: '从 QQ提醒 页面管理规则',
				intro: ['独立页面显示 QQ Bot 连接、接收目标、自动提醒规则和异常提醒设置。'],
				indexes: [3],
			},
			{
				type: 'feature-groups',
				id: 'background-and-data',
				title: '适合放在后台，也能带走历史记录',
				intro: ['CloudLight XiaoMi 可以放在 Windows 后台持续更新；设置页还提供长期运行和数据迁移需要的选项。'],
				groups: [
					{
						title: '后台运行',
						items: [
							{ title: '托盘与开机启动', description: '支持最小化到托盘、开机自动启动，以及启动后直接保持在托盘。' },
							{ title: '调整轮询间隔', description: '轮询间隔可设置为 5–300 秒，软件建议使用 10 秒或更长。' },
						],
					},
					{
						title: '数据导出与导入',
						items: [
							{ title: '.clpresence 文件', description: '导出路由器、设备、状态历史、主体关联和提醒规则，保存为版本化的 .clpresence 文件。' },
							{ title: '验证后合并', description: '导入前会检查文件，之后可以合并设备、事件和主体数据并跳过重复记录。' },
							{ title: '不带登录凭据', description: '导出文件不包含 Xiaomi 登录信息或 QQ AppSecret；提醒规则会保留接收目标 OpenID。' },
						],
					},
				],
			},
			{
				type: 'facts',
				id: 'usage-boundaries',
				title: '使用时要知道',
				items: [
					{ term: '系统', description: 'Windows 10 或 Windows 11 x64。' },
					{ term: '小米账号', description: '需要登录并能查看目标设备或小米路由器的小米账号；设备信息来自该账号在云端可见的数据。' },
					{ term: '持续记录', description: '持续记录需要 Windows 电脑保持开机、联网，且软件没有暂停监控。' },
					{ term: '安装包', description: '安装包带有程序所需的私有 Python 运行环境，普通用户不需要另外安装或修改系统 Python。' },
					{ term: '控制范围', description: '开关操作只出现在实际提供可读、可写电源能力的可用设备上，不代表支持所有米家功能。' },
					{ term: '记录边界', description: 'Presence 统计反映设备在路由器中的网络在线情况，不等同于人的精确位置。' },
				],
			},
		],
	},
	{
		slug: 'cloudlight-video-compressor',
		item: getCatalogItem('cloudlight-video-compressor'),
		pageDescription: 'Windows 批量视频分析与压缩工具，可按每个视频的实际信息生成压缩方案，并支持 Intel QSV、NVIDIA NVENC 和 AMD AMF 硬件编码。',
		sections: [
			{
				type: 'features',
				id: 'scan-and-decide',
				title: '先找到值得压缩的视频',
				intro: [
					'选择一个目录后，CloudLight Video Compressor 可以批量扫描视频，读取每个文件的实际信息，再根据当前条件判断需要压缩还是跳过。它适合先整理一批视频，再决定哪些文件值得处理。',
				],
				layout: 'columns',
				items: [
					{ title: '批量扫描', description: '支持扫描目录和子目录中的常见视频格式，不需要逐个打开文件查看。' },
					{ title: '读取实际信息', description: '列表显示文件大小、时长、分辨率、FPS、视频码率、总码率、编码格式和音频信息。' },
					{ title: '先判断再处理', description: '根据设置给每个视频标出需要压缩或跳过，并在列表中说明当前条件和判断结果。' },
				],
			},
			{
				type: 'features',
				id: 'smart-compression-plans',
				title: '每个视频都有自己的压缩计划',
				intro: [
					'智能自动压缩不会让一批完全不同的视频都套同一组机械参数。它会结合每个视频的分辨率、FPS、码率、Codec、文件大小和当前用途，分别规划压缩方式与目标。',
				],
				layout: 'cards',
				items: [
					{ title: '智能自动压缩', description: '扫描完成后，为每个视频生成自己的计划，尽量在节省空间和画面质量之间取得合适的取舍。' },
					{ title: '多种压缩方式', description: '可以选择 CRF 质量模式、指定视频码率、指定目标文件大小，或交给智能模式自动规划。' },
					{ title: '按需校准质量', description: '智能模式可按需通过 VMAF 抽样质量评估进一步调整方案；没有可用条件时会回退到可执行计划。' },
				],
			},
			{
				type: 'features',
				id: 'hardware-encoders',
				title: '按电脑实际可用的编码器执行',
				intro: [
					'有兼容的 Intel、NVIDIA 或 AMD 显卡时，可以选择对应硬件编码器提高压缩速度。软件会检查 FFmpeg 编码器和当前电脑是否实际可用，不会把显卡兼容性想当然。',
				],
				layout: 'columns',
				items: [
					{ title: '软件编码', description: '支持 H.264 和 H.265 软件编码，适合不使用硬件编码器的情况。' },
					{ title: 'Intel Quick Sync', description: '支持 H.264 QSV 和 H.265 QSV；能否使用取决于当前 Intel 硬件、驱动和 FFmpeg 检测结果。' },
					{ title: 'NVIDIA NVENC', description: '支持 H.264 NVENC 和 H.265 NVENC；能否使用取决于当前 NVIDIA 硬件、驱动和 FFmpeg 检测结果。' },
					{ title: 'AMD AMF', description: '支持 H.264 AMF 和 H.265 AMF；能否使用取决于当前 AMD 硬件、驱动和 FFmpeg 检测结果。' },
				],
			},
			{
				type: 'features',
				id: 'plan-before-run',
				title: '压缩前先看计划',
				intro: [
					'扫描和规划完成后，会进入独立的“压缩任务”页面。执行前先对照压缩前和计划压缩后的参数，确认这批任务确实符合预期。',
				],
				layout: 'list',
				items: [
					{ title: '看清会改什么', description: '计划会显示 Codec、码率、分辨率、FPS、压缩方式和编码器等预计变化。' },
					{ title: '区分计划与结果', description: '页面把原文件、计划值和完成后的实际值分开显示，不把预计节省空间当成最终结果。' },
					{ title: '确认后再执行', description: '确认任务计划后再开始批量压缩，不需要对着一个“开始压缩”按钮盲目等待。' },
				],
			},
			{
				type: 'features',
				id: 'task-results',
				title: '任务进度和实际结果都能看到',
				intro: ['执行过程中既能看单个视频，也能看整批任务的状态；完成后还可以把计划值和实际结果放在一起比较。'],
				layout: 'cards',
				items: [
					{ title: '单个与整体进度', description: '显示当前视频进度、整体任务进度、当前处理文件和 ETA。' },
					{ title: '状态清楚', description: '任务列表区分已完成、跳过、失败、排队和处理中，方便找到需要重新处理的文件。' },
					{ title: '结果对比', description: '完成后显示实际编码器、Codec、码率、分辨率、FPS、总码率、输出大小和节省空间。' },
					{ title: 'Fallback 和历史', description: '遇到计划无法直接执行时显示回退信息，并保留用户可见的结果和诊断记录。' },
				],
			},
			{
				type: 'note',
				id: 'protect-originals',
				title: '原视频不会直接被覆盖',
				description: '压缩时先生成临时输出，完成后检查视频流、时长和文件大小等结果，再决定是否提交最终文件。压缩失败、取消、验证失败，或者结果没有比原文件更小时，默认保留原视频。',
			},
			{
				type: 'feature-groups',
				id: 'install-and-run',
				title: '安装包拿来就能用',
				intro: ['普通用户不需要先准备一套视频处理环境，安装包已经把日常使用需要的组件放在一起。'],
				groups: [
					{
						title: '普通用户',
						items: [
							{ title: '自带运行环境', description: '安装包包含应用本体和 .NET 8 Windows Desktop Runtime。' },
							{ title: '自带 FFmpeg', description: '安装包同时包含 FFmpeg 和 ffprobe，不需要另外安装，也不需要配置 PATH。' },
						],
					},
					{
						title: '高级设置',
						items: [
							{ title: '可选自定义 FFmpeg', description: '如果有自己的 FFmpeg 环境，可以在设置中选择自定义 ffmpeg.exe 路径。' },
							{ title: '按目录处理', description: '扫描目录、原文件目录和输出目录可以按自己的文件整理方式选择。' },
						],
					},
				],
			},
			{
				type: 'facts',
				id: 'requirements',
				title: '使用前要知道',
				items: [
					{ term: '系统', description: 'Windows 10/11 x64。' },
					{ term: '压缩格式', description: '软件编码和硬件编码覆盖 H.264 / H.265；硬件编码器是否可用取决于电脑、驱动和 FFmpeg 检测结果。' },
					{ term: '安装方式', description: '推荐直接使用 Windows 安装包，普通用户不需要另外安装 .NET、FFmpeg 或 ffprobe。' },
					{ term: '文件位置', description: '原视频和输出视频使用你选择的目录；临时文件会在验证通过后才提交为最终结果。' },
				],
			},
			{
				type: 'links',
				id: 'source-and-release',
				title: '源码与发布记录',
				items: [
					{ label: '查看下载', href: 'https://github.com/Cloud-Light125/CloudLight-Video-Compressor/releases' },
					{ label: '查看 GitHub 仓库', href: 'https://github.com/Cloud-Light125/CloudLight-Video-Compressor' },
				],
			},
		],
	},
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
				title: '使用限制与注意事项',
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
		pageDescription: '面向 Windows 的 Codex 与 OpenClaw 桌面助手，可浏览和继续已有会话，也能通过 QQ 或 Telegram 选择会话、发送任务并接收最终回复。',
		sections: [
			{
				type: 'features',
				id: 'codex-and-openclaw',
				title: '两个后端，放在同一个会话工作区',
				intro: ['Codex 和 OpenClaw 会话在同一个 Windows 桌面助手里浏览和继续。列表会明确区分后端，减少选错目标的机会。'],
				layout: 'columns',
				items: [
					{ title: 'Codex', description: '浏览已有会话的标题、项目目录、状态、模型和时间，在原会话中继续发送任务，也可以停止运行中的任务。' },
					{ title: 'OpenClaw', description: '连接本机 OpenClaw Gateway，浏览已有 Session，使用 Session Key 绑定并继续发送消息或停止任务。' },
					{ title: '列表标识', description: '会话列表使用 [Codex] 和 [OpenClaw] 区分后端；Codex 会话还会分配稳定的 #N 编号。' },
				],
			},
			{
				type: 'screenshots',
				id: 'openclaw-session-screen',
				title: 'OpenClaw Session 也能在桌面端继续',
				intro: ['OpenClaw 页面显示 Gateway、Session 列表、当前会话消息和继续发送 / 停止入口。'],
				indexes: [0],
			},
			{
				type: 'features',
				id: 'remote-chat-controls',
				title: 'QQ 和 Telegram 可以做什么',
				intro: ['QQ 和 Telegram 是远程消息入口。Bridge 统一接收消息，再转发给你选定的 Codex 或 OpenClaw 后端；完整命令列表继续放在 GitHub README 中。'],
				layout: 'cards',
				items: [
					{ title: '查询会话', description: '查看最近会话、历史消息、正在运行、等待回答、最近完成或最近失败的任务。' },
					{ title: '查询额度', description: '通过远程命令查询 Codex 当前实际额度，减少需要回到电脑查看的情况。' },
					{ title: '绑定目标', description: '绑定、解除绑定或查看当前会话；OpenClaw 可以使用 oc: 开头的 Session Key。' },
					{ title: '继续或停止', description: '发送后续消息，按需停止或取消由当前远程地址发起的任务。' },
				],
			},
			{
				type: 'features',
				id: 'chat-number-and-bindings',
				title: '用短编号指向正确的 Codex 会话',
				intro: ['远程聊天时不需要复制一长串 Thread ID。Bridge 会给 Codex 会话分配较短的稳定编号，同时保留 OpenClaw 使用完整 Session Key 的方式。'],
				layout: 'list',
				items: [
					{ title: '#N 编号', description: '例如发送“#41 继续处理剩余任务”，就能把消息交给编号 41 的 Codex 会话。' },
					{ title: '当前绑定', description: '可以查看当前聊天绑定了哪个会话，也可以重新绑定或解除绑定。' },
					{ title: 'OpenClaw Session Key', description: 'OpenClaw 使用 oc:agent:main:main 这类 Session Key 指定会话，不和 Codex 的 #N 混用。' },
				],
			},
			{
				type: 'screenshots',
				id: 'remote-channel-screen',
				title: '远程渠道可以分配给不同后端',
				intro: ['QQ Bot 页面显示连接状态、OpenID 和把消息分配到 Codex 或 OpenClaw 的入口。'],
				indexes: [2],
			},
			{
				type: 'features',
				id: 'custom-commands',
				title: '指令可以按自己的习惯调整',
				intro: ['内置系统指令可以解锁后编辑，QQ 和 Telegram 使用同一套配置；需要时也能添加自己的自定义指令。'],
				layout: 'columns',
				items: [
					{ title: '改名和别名', description: '修改显示名称，为指令添加更容易记的别名。' },
					{ title: '停用与恢复', description: '暂时停用不需要的指令，之后可以恢复；内置指令修改前需要先解锁。' },
					{ title: '创建自定义指令', description: '按自己的远程操作习惯添加指令、说明和参数。' },
					{ title: '同一套配置', description: 'QQ 和 Telegram 共用指令配置，不需要为不同渠道重复维护。' },
				],
			},
			{
				type: 'screenshots',
				id: 'commands-screen',
				title: '在指令页统一管理远程命令',
				intro: ['指令页显示已加载数量、渠道共用配置和解锁、编辑、恢复入口。'],
				indexes: [1],
			},
			{
				type: 'feature-groups',
				id: 'sync-backup-and-desktop',
				title: '消息只同步一次，数据也可以备份',
				intro: ['Bridge 把远程渠道、桌面运行和本地数据管理放在同一个设置体系里，适合长期放在 Windows 后台。'],
				groups: [
					{
						title: '消息同步',
						items: [
							{ title: '每个任务一次最终回答', description: '一次任务只向远程渠道同步一条最终回答，不让过程消息连续刷屏。' },
							{ title: '按需提醒', description: '可以分别设置 Telegram、QQ 的接收目标，以及等待回答、错误和停止提醒。' },
						],
					},
					{
						title: '备份与恢复',
						items: [
							{ title: '.clcbak 备份', description: '可把 Codex 数据目录和 Bridge 应用数据一起备份为 .clcbak 文件。' },
							{ title: '替换或合并', description: '恢复前检查完整性，支持完整替换或只补入缺失文件；恢复前会自动备份当前状态。' },
						],
					},
					{
						title: 'Windows 桌面行为',
						items: [
							{ title: '托盘与静默启动', description: '支持开机启动、静默启动和最小化到托盘，需要时再恢复窗口。' },
							{ title: '设置与日志', description: '主题、数据目录、日志目录、Codex 路径、频道配置和 OpenClaw Gateway 都可以在桌面端调整。' },
						],
					},
				],
			},
			{
				type: 'facts',
				id: 'connection-requirements',
				title: '安装与连接要求',
				items: [
					{ term: '系统', description: 'Windows 10 1809 或更高版本，x64。' },
					{ term: 'Codex', description: '已经安装并能正常使用 Codex CLI 或 Codex Desktop，且已完成登录。' },
					{ term: 'OpenClaw', description: 'OpenClaw 是可选后端；需要能连接本机 OpenClaw Gateway，并准备可用的 Session。' },
					{ term: '远程渠道', description: '需要自行准备 QQ 或 Telegram Bot 凭据、接收目标和对应网络连接。' },
					{ term: '安装包', description: '当前公开 Release v1.1.4 的完整安装包包含 .NET 8 Windows 桌面运行环境；便携版可能需要电脑已有对应运行环境。' },
				],
			},
			{
				type: 'bullets',
				id: 'remote-boundaries',
				title: '远程端有哪些边界',
				tone: 'warning',
				items: [
					'远程端不能批准 Codex 的 Approval，也不能新建、Fork 或自动排队会话。',
					'Bridge 不会替你登录 Codex，也不会修改当前会话的模型、权限或安全设置。',
					'完整备份可能包含 Codex 或 Bridge 的凭据，备份文件应当像登录数据一样保存。',
					'安装包尚未进行商业代码签名，也不包含自动更新。',
				],
			},
			{
				type: 'links',
				id: 'source-and-release',
				title: '源码与发布记录',
				items: [
					{ label: '查看下载', href: 'https://github.com/Cloud-Light125/Codex-Bridge/releases' },
					{ label: '查看 GitHub 仓库', href: 'https://github.com/Cloud-Light125/Codex-Bridge' },
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
				title: '导出步骤',
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
