export enum EarthBranch {
    Pig,
    Rat,
    Ox,
    Tiger,
    Rabbit,
    Dragon,
    Snake,
    Horse,
    Goat,
    Monkey,
    Rooster,
    Dog
}

export let EarthBranchChineseDisplay: { [index: number]: string } = {};
EarthBranchChineseDisplay[EarthBranch.Pig] = "亥/-в";
EarthBranchChineseDisplay[EarthBranch.Rat] = "子/+В";
EarthBranchChineseDisplay[EarthBranch.Ox] = "丑/-п";
EarthBranchChineseDisplay[EarthBranch.Tiger] = "寅/+Д";
EarthBranchChineseDisplay[EarthBranch.Rabbit] = "卯/-д";
EarthBranchChineseDisplay[EarthBranch.Dragon] = "辰/+П";
EarthBranchChineseDisplay[EarthBranch.Snake] = "巳/-о";
EarthBranchChineseDisplay[EarthBranch.Horse] = "午/+О";
EarthBranchChineseDisplay[EarthBranch.Goat] = "未/-п'";
EarthBranchChineseDisplay[EarthBranch.Monkey] = "申/+М";
EarthBranchChineseDisplay[EarthBranch.Rooster] = "酉/-м";
EarthBranchChineseDisplay[EarthBranch.Dog] = "戌/+П'";

export let EarthBranchRussianDisplay: { [index: number]: string } = {};
EarthBranchRussianDisplay[EarthBranch.Pig] = "Свинья";
EarthBranchRussianDisplay[EarthBranch.Rat] = "Крыса";
EarthBranchRussianDisplay[EarthBranch.Ox] = "Бык";
EarthBranchRussianDisplay[EarthBranch.Tiger] = "Тигр";
EarthBranchRussianDisplay[EarthBranch.Rabbit] = "Кролик";
EarthBranchRussianDisplay[EarthBranch.Dragon] = "Дракон";
EarthBranchRussianDisplay[EarthBranch.Snake] = "Змея";
EarthBranchRussianDisplay[EarthBranch.Horse] = "Лошадь";
EarthBranchRussianDisplay[EarthBranch.Goat] = "Коза";
EarthBranchRussianDisplay[EarthBranch.Monkey] = "Обехьяна";
EarthBranchRussianDisplay[EarthBranch.Rooster] = "Петух";
EarthBranchRussianDisplay[EarthBranch.Dog] = "Собака";