export enum SkyStem {
    YinWater,
    YangWood,
    YinWood,
    YangFire,
    YinFire,
    YangEarth,
    YinEarth,
    YangMetal,
    YinMetal,
    YangWater
}

export let SkyStemChineseDisplay: { [index: number]: string } = {};
SkyStemChineseDisplay[SkyStem.YinWater] = "癸/-в";
SkyStemChineseDisplay[SkyStem.YangWood] = "甲/+Д";
SkyStemChineseDisplay[SkyStem.YinWood] = "乙/-д";
SkyStemChineseDisplay[SkyStem.YangFire] = "丙/+О";
SkyStemChineseDisplay[SkyStem.YinFire] = "丁/-о";
SkyStemChineseDisplay[SkyStem.YangEarth] = "戊/+П";
SkyStemChineseDisplay[SkyStem.YinEarth] = "己/-п";
SkyStemChineseDisplay[SkyStem.YangMetal] = "庚/+М";
SkyStemChineseDisplay[SkyStem.YinMetal] = "辛/-м";
SkyStemChineseDisplay[SkyStem.YangWater] = "壬/+В";

export let SkyStemRussianDisplay: { [index: number]: string } = {};
SkyStemRussianDisplay[SkyStem.YinWater] = "Вода Инь";
SkyStemRussianDisplay[SkyStem.YangWood] = "Дерево Ян";
SkyStemRussianDisplay[SkyStem.YinWood] = "Дерево Инь";
SkyStemRussianDisplay[SkyStem.YangFire] = "Огонь Ян";
SkyStemRussianDisplay[SkyStem.YinFire] = "Огонь Инь";
SkyStemRussianDisplay[SkyStem.YangEarth] = "Почва Ян";
SkyStemRussianDisplay[SkyStem.YinEarth] = "Почва Инь";
SkyStemRussianDisplay[SkyStem.YangMetal] = "Металл Ян";
SkyStemRussianDisplay[SkyStem.YinMetal] = "Металл Инь";
SkyStemRussianDisplay[SkyStem.YangWater] = "Вода Ян";