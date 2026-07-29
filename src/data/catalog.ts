export interface CatalogItem {
	name: string;
	englishName?: string;
	summary: string;
	repository?: string;
	sourceUrl?: string;
	sourceLabel?: string;
	website?: string;
	websiteLabel?: string;
	repositoryLabel?: string;
	detailsPath?: string;
	downloadUrl?: string;
	downloadLabel?: string;
	downloadNote?: string;
	category: string;
	status: string;
	visibility: 'public' | 'private';
	tags: string[];
}

export const gameTools: CatalogItem[] = [
	{
		name: 'Steam 游玩时光全景图',
		summary:
			'根据一个或多个 Steam 账号的公开游戏时长生成封面全景图。游玩越久，游戏封面越醒目；相同游戏的时长可跨账号累计，并支持排行榜和 PNG 图片导出。',
		repository: 'https://github.com/yundan125/playtime-panorama',
		website: 'https://playtime.269332.xyz',
		websiteLabel: '立即使用',
		repositoryLabel: '查看源码',
		category: 'Steam / 数据可视化',
		status: '可用',
		visibility: 'public',
		tags: ['Steam', '游戏数据', '多账号累计', 'PNG 导出'],
	},
	{
		name: '守望先锋看图猜英雄',
		summary:
			'面向没玩过《守望先锋》的玩家制作的第一印象猜名游戏。根据英雄图标或全身照，从名称池中为每位英雄分配名字并填写理由，提交后再揭晓真实名称和猜测结果。',
		repository: 'https://github.com/yundan125/overwatch-hero-quiz',
		website: '/overwatch-hero-quiz/',
		category: '守望先锋 / 英雄猜名',
		status: '可用',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
	{
		name: 'OWCS Predictor',
		summary:
			'面向 OWCS 2026 Midseason Championship 小组赛的浏览器对战预测器，支持选择胜者、录入比分、编辑赛事配置、导入导出和本地保存。',
		repository: 'https://github.com/yundan125/OWCS-Predictor',
		website: '/owcs-predictor/',
		websiteLabel: '立即使用',
		category: '电竞 / 预测工具',
		status: '可用',
		visibility: 'public',
		tags: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
	},
];

export const projects: CatalogItem[] = [
	{
		name: 'CloudLight 自动化工作室',
		englishName: 'CloudLight Automator',
		summary:
			'用可视化流程图组合窗口、截图、图像识别、OCR、剪贴板和键鼠操作，创建可以重复运行的 Windows 自动化流程。',
		repository: 'https://github.com/yundan125/cloudlight-automator',
		detailsPath: '/projects/cloudlight-automator/',
		downloadUrl: 'https://github.com/yundan125/cloudlight-automator/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote:
			'GitHub Releases 提供 Windows 10/11 x64 当前用户安装包和便携 ZIP，并附 checksums.txt 供 SHA-256 校验。当前发布未进行代码签名。',
		category: 'Windows 自动化工具',
		status: '可用',
		visibility: 'public',
		tags: ['可视化工作流', 'Windows', 'OCR', 'RPA Framework'],
	},
	{
		name: 'CloudLight SOOP 掉宝挂机工具',
		englishName: 'CloudLight SOOP Drops Miner',
		summary:
			'用于参加 SOOP Live（原 AfreecaTV）的 Drops 活动，可同时管理多个账号，自动寻找符合任务的直播间，并集中查看任务进度和已获得的奖励。',
		repository: 'https://github.com/yundan125/cloudlight-soop-drops-miner',
		detailsPath: '/projects/cloudlight-soop-drops-miner/',
		downloadUrl: 'https://github.com/yundan125/cloudlight-soop-drops-miner/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote:
			'GitHub Releases 提供 v1.0.2 Windows 单文件 EXE，普通使用无需另装 Python。程序会把各账号的登录会话保存在 EXE 同目录的 accounts 文件夹中；其中可能包含 AuthTicket 等敏感 Cookie，请妥善保管并勿与他人共享。',
		category: 'SOOP Live 掉宝工具',
		status: '可用',
		visibility: 'public',
		tags: ['SOOP Live', '多账号', 'Drops', 'Python'],
	},
	{
		name: '微软拼音清理工具',
		englishName: 'MicrosoftPinyinCleaner',
		summary:
			'Windows 更新重新加入微软拼音后，可一键检测并从当前用户的输入法列表中移除。也可以在登录时自动检查，同时保留其他中文输入法。',
		repository: 'https://github.com/yundan125/MicrosoftPinyinCleaner',
		detailsPath: '/projects/microsoft-pinyin-cleaner/',
		downloadUrl:
			'https://github.com/yundan125/MicrosoftPinyinCleaner/releases/download/v1.0.0/MicrosoftPinyinCleaner.exe',
		downloadLabel: 'GitHub 下载',
		downloadNote:
			'正式版 v1.0.0，提供 Windows 10/11 x64 自包含单文件程序，无需另装 .NET。文件大小 77,603,721 字节，SHA-256 为 B8FE5E85E380E55EBD02512A15691CECA47332DE1AC0ED82F8E4846A3F0DBBE2。',
		category: 'Windows 输入法工具',
		status: '可用',
		visibility: 'public',
		tags: ['Windows', '输入法', 'WPF', '.NET 8'],
	},
	{
		name: 'Windows 高级电源设置管理器',
		englishName: 'PowerSettingsManager',
		summary:
			'扫描 Windows 10/11 中被隐藏的高级电源选项，并集中管理它们的显示、隐藏和恢复。修改前会保存快照和注册表备份。',
		repository: 'https://github.com/yundan125/PowerSettingsManager',
		detailsPath: '/projects/power-settings-manager/',
		downloadUrl: 'https://github.com/yundan125/PowerSettingsManager/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows x64 便携 ZIP，已包含运行所需组件。解压后即可运行。',
		category: 'Windows 系统工具',
		status: '可用',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'PowerCfg', 'Windows 注册表'],
	},
	{
		name: 'Windows 移动热点控制器',
		englishName: 'MobileHotspotController',
		summary:
			'用于管理 Windows 11 移动热点。在设备支持时，也可以通过 Wi-Fi Direct 创建只供局域网连接的热点，并提供托盘控制和诊断信息。',
		repository: 'https://github.com/yundan125/MobileHotspotController',
		detailsPath: '/projects/mobile-hotspot-controller/',
		downloadUrl: 'https://github.com/yundan125/MobileHotspotController/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows 11 x64 单文件程序，无需另外安装 .NET 运行时。',
		category: 'Windows 网络工具',
		status: '可用',
		visibility: 'public',
		tags: ['.NET 8', 'WPF', 'WinRT', 'Wi-Fi Direct'],
	},
	{
		name: 'TwitchDropsMiner 掉宝自动领取开关补丁工具',
		englishName: 'TDM Claim Toggle Patcher',
		summary:
			'为 TwitchDropsMiner 增加可开关的自动领取掉宝功能。应用补丁前会检查源码兼容性，并保存可以恢复的备份。',
		repository: 'https://github.com/yundan125/tdm-claim-toggle-patcher',
		detailsPath: '/projects/tdm-claim-toggle-patcher/',
		downloadUrl: 'https://github.com/yundan125/tdm-claim-toggle-patcher/releases/latest',
		downloadLabel: 'GitHub 下载',
		downloadNote: 'GitHub Releases 中提供 Windows 单文件程序，图形界面和命令行均可使用。',
		category: '源码补丁工具',
		status: '可用',
		visibility: 'public',
		tags: ['Python', 'AST', 'GUI / CLI', 'TwitchDropsMiner'],
	},
	{
		name: '盛大通行证一键登录辅助脚本',
		summary:
			'自动识别盛大通行证登录页面，勾选登录协议、切换到一键登录方式并填写预先保存在用户脚本管理器中的账号，减少重复选择和输入操作。',
		sourceUrl:
			'https://greasyfork.org/zh-CN/scripts/589035-%E7%9B%9B%E5%A4%A7%E9%80%9A%E8%A1%8C%E8%AF%81%E8%87%AA%E5%8A%A8%E5%88%87%E6%8D%A2%E4%B8%80%E9%94%AE%E7%99%BB%E5%BD%95%E5%B9%B6%E5%A1%AB%E5%86%99%E8%B4%A6%E5%8F%B7',
		sourceLabel: '查看 Greasy Fork 页面',
		detailsPath: '/projects/shanda-passport-login-helper/',
		downloadUrl:
			'https://update.greasyfork.org/scripts/589035/%E7%9B%9B%E5%A4%A7%E9%80%9A%E8%A1%8C%E8%AF%81%E8%87%AA%E5%8A%A8%E5%88%87%E6%8D%A2%E4%B8%80%E9%94%AE%E7%99%BB%E5%BD%95%E5%B9%B6%E5%A1%AB%E5%86%99%E8%B4%A6%E5%8F%B7.user.js',
		downloadLabel: '安装脚本',
		downloadNote:
			'Greasy Fork 当前公开版本为 1.1.0。点击安装后，已安装的用户脚本管理器会显示脚本信息与权限，确认后才会完成安装。',
		category: '浏览器用户脚本',
		status: '可用',
		visibility: 'public',
		tags: ['JavaScript', '用户脚本', 'Greasy Fork', '登录辅助'],
	},
];
