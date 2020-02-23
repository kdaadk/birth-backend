import {SetupPentagram} from "../models/setupPentagram";
import {Constants} from "../shared/constants";
import {Setup} from "../models/setup/setup";
import {Description} from "../models/setup/description";
import {EnergyList} from "../models/setup/energyList";
import {Section} from "../models/setup/section";

export class SetupModelBuilder {
    public static build(pentagram?: SetupPentagram) {
        if (!pentagram)
            return undefined;

        let outerEnergies = pentagram.outerEnergies;        
        const { heat, dryness, humidity, cold, wind } = outerEnergies;

        if (heat.color === Constants.Red &&
            humidity.color === Constants.Red &&
            dryness.color === Constants.Blue)
        {
            return wind.color === Constants.Red
                ? this.getHeatSetup("ян-Тепло")
                : this.getColdSetup("инь-Холод");
        }
        if (heat.color === Constants.Blue &&
            humidity.color === Constants.Blue &&
            dryness.color === Constants.Red)
        {
            return wind.color === Constants.Red
                ? this.getColdSetup("ян-Холод")
                : this.getHeatSetup("инь-Тепло");
        }
        if (heat.color === Constants.Red && humidity.color === Constants.Blue)
        {
            return cold.color === Constants.Red
                ? this.getWindSetup("ян-Ветер")
                : this.getDrynessSetup("инь-Сухость");
        }
        if (heat.color === Constants.Blue && humidity.color === Constants.Red)
        {
            return cold.color === Constants.Red
                ? this.getDrynessSetup("ян-Сухость")
                : this.getWindSetup("инь-Ветер");
        }
        if (heat.color === Constants.Red &&
            humidity.color === Constants.Red &&
            dryness.color === Constants.Red)
        {
            return this.getHumiditySetup("ян-Влажность");
        }
        if (heat.color === Constants.Blue &&
            humidity.color === Constants.Blue &&
            dryness.color === Constants.Blue)
        {
            return this.getHumiditySetup("инь-Влажность");
        }

        throw new Error();
    }
    
    private static getHeatSetup(fullName: string) {
        const baseFeature: EnergyList = {
            header: "Основные характеристики:",
            list: [
                "Оптимизм", "Активность", "Желание действовать", "Открытость", "Интерес к окружающему",
                "Жизнерадостность", "Разговорчивость (болтает с удовольствием)",
                "Хороший оратор, красноречив",
                "Увлеченность", "Находчивость", "Трудолюбие",
                "Коммуникабельность (любит общаться, не переносит одиночества)",
                "Противопоказана рутинная, однообразная работа", "Очень заботливые, очень щедрые",
                "Хорошее чувство юмора", "Азарт", "Отвага"
            ]
        };
        const mentalLevel: Section = {
            header: "На ментальном уровне",
            text: "энергия Тепла представлена как Желание. Для Инь-Желания характерно все время что-то делать," +
                " получая от этого удовольствие При этом человек не думает о результате. то есть для Инь-Желания" +
                " характерно действие без раздумий и глубокого анализа последствий. Инь-Желание устойчиво," +
                " может сохраняться на протяжении всей жизни человека. В отношениях это любовь на всю жизнь." +
                " Для Ян-Желания характерно очень сильное желание достичь своей цели в короткий, ограниченный" +
                " промежуток времени. Ян-Желание связано со страстью. Оно не может длиться долго. Действие в" +
                " соответствии с импульсом сильного желания влечет за собой большую вероятность неудачи," +
                " так как в этот момент нет ни анализа ситуации, ни воли. Такие люди быстро устают и разочаровываются." +
                " Они не могут выполнять длительную работу. Человек с избытком Ян-Желания тороплив," +
                " он легко влюбляется, любит ярко, страстно, но кратковременно.",
            excess: new EnergyList("При избытке энергии:", ["Истерическое состояние", "Излишняя возбудимость", "Нервозность"]),
            lack: new EnergyList("При недостатке энергии:", [
                "Снижение настроения и активности", "Отсутствие интереса", "Тусклость", "Опустошенность",
                "Меланхолия", "Пессимизм", "Бессмысленная болтовня", "Растерянность", "Ревность", "Зависть"])
        };
        const emotionalLevel: Section = {
            header: "На эмоциональном уровне",
            text: "энергия Тепла представлена эмоцией Радость. Для Инь-Радости характерна тихая, постоянная," +
                " едва заметная улыбка. Человек радуется искренне, всем сердцем (доброжелательность, оптимизм)." +
                " Эмоция Ян-Радости проявляется громким заразительным смехом. Это радость бурная и ярко" +
                " выраженная, но не постоянная, достаточно кратковременная.",
            excess: new EnergyList("При избытке энергии:", [
                "Беспричинное веселье, смех", "Чрезмерная разговорчивость", "Эйфория", "Праздность",
                "Заносчивость", "Высокомерие", "Гордыня"]),
            lack: new EnergyList("При недостатке энергии:", ["Тревога", "Страх", "Пугливость", "Растерянность", "Печаль"])
        };
        const setup: Setup = {
            fullName: fullName,
            shortName: "Тепло",
            color: Constants.Red,
            description: new Description(baseFeature, mentalLevel, emotionalLevel)
        };
        
        return setup;
    }

    private static getColdSetup(fullName: string) {
        const baseFeature: EnergyList = {
            header: "Основные характеристики:",
            list: [
                "Мудрое видение жизни", "Собственное мнение обо всем", "Философ", "Мечтатель",
                "Вдумчивость",
                "Интуитивное чувствование причин происходящего и тенденций развития событий",
                "Больше мыслитель, чем человек действия (может сидеть и размышлять, когда все вокруг в действии)",
                "Может успешно работать и общаться только в комфортных для него условиях",
                "Хорошо чувствует себя в «тени», не любит быть в центре внимания",
                "Склонен к одиночеству", "Потребность в общении и в одиночестве периодически чередуется",
                "От общения он устает, а силы восстанавливает, в отличие от человека Ветра, Тепла или Влажности, в одиночестве"
            ]
        };
        const mentalLevel: Section = {
            header: "На ментальном уровне",
            text: "энергия Холода это Мудрость. Человек Инь-Мудрости постоянно рассчитывает, подсчитывает," +
                " присматривается к обстановке и оценивает ее, с трудом принимает решение, так как боится ошибиться." +
                " Он хитер и мудр, иногда до гениальности, и весьма проницателен, но зачастую все это исходит" +
                " только из соображений собственной безопасности. Такой человек способен вовремя остановиться," +
                " взвесив возможные последствия. Он соглашается и уступает, чтобы избежать обострения отношений," +
                " но в дальнейшем может все же поступить по-своему. Часто он безынициативен и использует чужие идеи." +
                " Человек с энергией Ян-Мудрости умеет быстро оценить ситуацию. Его мудрость ближе к ловкости," +
                " он очень хитер и изобретателен в обеспечении своей безопасности, но чаще всего проявляет" +
                " осторожность лишь в экстремальных ситуациях.",
            excess: new EnergyList("При избытке энергии:", ["Отстраненность", "Цинизм", "Пессимизм", "Негативное восприятие событий",
                "Недоверчивость", "Подозрительность", "Мнительность", "Скрытность", "Замкнутость"]),
            lack: new EnergyList("При недостатке энергии:", [
                "Склонность к фантазированию", "Оторванность от реальности", "Суетливость",
                "Пассивность", "Рассеянность", "Забывчивость"])
        };
        const emotionalLevel: Section = {
            header: "На эмоциональном уровне",
            text: "энергия Холода представлена эмоцией Страха. Инь-Страх — это постоянно испытываемый страх" +
                " перед чем-то определенным, конкретным, или постоянная боязнь всего на свете, беспокойство" +
                " о том, как бы не случилось чего-то угрожающего, например, благополучию или здоровью." +
                " Инь-Страх — это предусмотрительность и осторожность, причем внешний вид человека может" +
                " прямо не указывать на такое его состояние, но он может поделиться своими страхами при" +
                " доброжелательном расспросе. Ян-Страх — это ярко выраженный, но кратковременный страх." +
                " У людей с избытком Ян-Страха внезапно, непредсказуемо может появиться резкий, необычный" +
                " и необоснованный страх. В этом случае человек может не совладать со своими эмоциями" +
                " и упасть в обморок. Внезапный сильный испуг, например, при неожиданном громком звуке" +
                " также относится к категории Ян-Страха.",
            excess: new EnergyList("При избытке энергии:", ["Апатичность", "Депрессия", "Ипохондрия", "Ворчливость", "Страх"]),
            lack: new EnergyList("При недостатке энергии:", ["Эмоционально застывший (замороженный)", "Фобии", "Пугливость", "Ужас"])
        };
        const setup: Setup = {
            fullName: fullName,
            shortName: "Холод",
            color: Constants.Blue,
            description: new Description(baseFeature, mentalLevel, emotionalLevel)
        };

        return setup;
    }

    private static getDrynessSetup(fullName: string) {
        const baseFeature: EnergyList = {
            header: "Основные характеристики:",
            list: [
                "Неторопливость", "Пунктуальность и дисциплинированность", "Методичность", "Обязательность",
                "Безупречность, непогрешимость и организованность, у него все на своих местах",
                "Аналитический ум (склонность к анализу, систематизации)",
                "Консерватизм (цепляется за правила, предписания, традиции, даже если они уже препятствуют росту и развитию)",
                "Неспособность к компромиссам и уступкам (даже если его планы нарушаются из-за неудачной тактики, то он не меняет ее, так как для этого он недостаточно гибок, а будет пытаться действовать по заранее установленным правилам снова и снова)",
                "Сдержанность (не любит конфликтов, так как это для него элемент беспорядка)",
                "Склонность сожалеть о прошлом", "Немногословность", "Замкнутость", "Отстраненность",
                "Сухость в отношениях с окружающими (скуп и односложен)", "Скрытность",
                "Больше наблюдатель, чем человек действия"
            ]
        };
        const mentalLevel: Section = {
            header: "На ментальном уровне",
            text: "энергия Сухости это Воля. Человек Инь-Воли характеризуется способностью к анализу," +
                " умеет все прекрасно классифицировать и систематизировать, расставлять «по полочкам»." +
                " В то же время он отличается инерционностью, консерватизмом и непринятием новых идей." +
                " Часто и быстро говорит «нет», легко отказывает, так как не любит того, что им не запланировано." +
                " В мышлении преобладает несколько направлений, которые развиваются последовательно," +
                " а не одновременно. Он может служить только одной идее. Решения принимает быстро." +
                " Воля подавляет Оригинальность, поэтому человек всегда сохраняет заранее выбранное решение," +
                " тактику действий, мнение обо всем. Воля подавляет внезапно возникающие Желания, эмоции," +
                " внезапного интереса к тому, что не относится к выполнению определенной задачи," +
                " тем самым постоянно ограничивая себя, что приводят к узости мышления. Человек с Ян-Волей" +
                " быстро принимает решения только в ответственные моменты. Консерватизм его ярко выражен," +
                " мышление не гибко. Такой человек склонен проявлять настойчивость, но она кратковременна.",
            excess: new EnergyList("При избытке энергии:", ["Чрезмерная страсть к совершенству", "Однобокость и косность мышления", "Упрямство",
                "Деспотизм", "Склонность к предрассудкам"]),
            lack: new EnergyList("При недостатке энергии:", ["Внутреннее беспокойство",
                "Отсутствие уверенности в себе (следование  лишь внешним правилам и ограничениям)"])
        };
        const emotionalLevel: Section = {
            header: "На эмоциональном уровне",
            text: "энергия Сухости представлена эмоцией Печали. Инь-Печаль — это состояние легкой грусти," +
                " некоторого разочарования, отсутствия радости жизни. Избыток Инь-Печали проявляется в том," +
                " что человек становится слезливым, часто плачет по незначительному поводу, даже, например," +
                " если смотрит фильм или спектакль. Он постоянно находится в плохом настроении, которое пытается" +
                " скрыть от окружающих. Переживания Ян-Печали сродни реакции на большое горе. Сильная печаль" +
                " очень опасна, так как Ян-Печаль по циклу созидания может быстро перейти в  Ян-Страх (Холод)," +
                " в тяжелую болезнь, иногда в состоянии Ян-Печали человек может отказаться от жизни.",
            excess: new EnergyList("При избытке энергии:", ["Суровость", "Холодность", "Равнодушие", "Гордость", "Бескомпромиссность", "Фанатизм"]),
            lack: new EnergyList("При недостатке энергии:", ["Апатия", "Печаль", "Грусть", "Тоска", "Разочарование", "Глубокая депрессия",
                "Плаксивость", "Потеря интереса к жизни", "Пессимизм"])
        };
        const setup: Setup = {
            fullName: fullName,
            shortName: "Сухость",
            color: Constants.Gray,
            description: new Description(baseFeature, mentalLevel, emotionalLevel)
        };

        return setup;
    }

    private static getHumiditySetup(fullName: string) {
        const baseFeature: EnergyList = {
            header: "Основные характеристики:",
            list: [
                "Рассудительность (мастер расставлять все на нужные места, способен увидеть перспективу, выделить приоритеты)",
                "Последовательность во всех действиях", "Спокойствие, уравновешенность", "Стабильность",
                "Миролюбивость", "Мягкость",
                "Дипломатичность (часто служит посредником в разрешении конфликтов)",
                "Достаточно общителен", "Неторопливость", "Сосредоточенность", "Ответственность",
                "Обязательность",
                "Заботливость (способен жить для других людей, любит семью, друзей, получает удовлетворение при решении чужих проблем)",
                "Способность оказать поддержку", "Терпеливость", "Сентиментальность",
                "Не любит перемен, сопротивляется им, так как считает это угрозой своей безопасности и стабильности",
                "Не любит разрывать или изменять отношения с другими людьми, оставлять должности, места, возможности"
            ]
        };
        const mentalLevel: Section = {
            header: "На ментальном уровне",
            text: "энергия Влажности представлена как Сознание. Инь-Сознание обладает способностью к максимальной" +
                " интеллектуальной активности (развита способность оценивать результаты действий, классифицировать," +
                " определять, объединять в единое целое, не теряя основной идеи). Дети Инь-Сознания в школе часто" +
                " отличники по всем предметам. Для Инь-Сознания характерна хорошая память. Ум не столь быстрый," +
                " как у человека Ветра, но выносливый, способный работать с несколькими вопросами сразу, не теряя логики." +
                " Для Ян-Сознания характерна способность к концентрации (на одном вопросе, задаче, идее) и анализу." +
                " Дети Ян-Сознания имеют отличные оценки по одним предметам и плохие по другим.",
            excess: new EnergyList("При избытке энергии:", ["Вязкость мышления", "Излишняя детализация", "«Застревание» на идее",
                "Потеря чувства приоритетности", "Неумение отличить главное от второстепенного", "Непоследовательность действий",
                "Излишняя заботливость", "Навязчивость", "Назойливость", "Инертность"]),
            lack: new EnergyList("При недостатке энергии:", ["Внутренняя пустота", "Непоследовательность",
                "Потеря ясности мышления", "Потеря уверенности в себе", "Неудовлетворенность собой и жизнью в целом"])
        };
        const emotionalLevel: Section = {
            header: "На эмоциональном уровне",
            text: "энергия Влажности представлена эмоцией Тревоги. Для Инь-Тревоги характерно" +
                " (даже при незначительном стрессе или событии) погружаться в задумчивость. Мысли у человека" +
                " Инь-Тревоги постоянно возвращаются к данному вопросу, нарушается сон. Ян-Тревога – это непродолжительное," +
                " но сильное, часто непредвиденное, и вызванное конкретными обстоятельствами, состояние." +
                " Иногда оно бывает настолько сильным, что человек может даже на несколько дней отказаться от приема пищи.",
            excess: new EnergyList("При избытке энергии:", ["Тревожность", "Излишнее беспокойство", "Назойливость",
                "Переживания по незначительному поводу"]),
            lack: new EnergyList("При недостатке энергии:", ["Мрачность", "Жалость к себе", "Состояние паники"])
        };
        const setup: Setup = {
            fullName: fullName,
            shortName: "Влажность",
            color: Constants.Gold,
            description: new Description(baseFeature, mentalLevel, emotionalLevel)
        };

        return setup;
    }

    private static getWindSetup(fullName: string) {
        const baseFeature: EnergyList = {
            header: "Основные характеристики:",
            list: [
                "Сообразительность", "Изобретательность", "Реформаторство", "Хорошее воображение",
                "Переменчивость настроения, мыслей, рода деятельности", "Любовь к путешествиям",
                "Человек действия",
                "Для воплощения в жизнь своей идеи готов поступиться комфортом, нарушить традиции, установленный порядок",
                "Хорошо работает в условиях «прорыва», конкуренции, преодоления трудностей",
                "Любит исследовать неизвестное",
                "Аналитический ум, благодаря способности «просмотреть» много вариантов вперед",
                "Любопытство", "Хорошее чувство юмора", "Возбудимость", "Удивление", "Любознательность"
            ]
        };
        const mentalLevel: Section = {
            header: "На ментальном уровне",
            text: "энергия Ветра представлена как Оригинальность. Инь-Оригинальность – человеку постоянно приходят" +
                " в голову новые идеи, но далеко не все из них реализуются. Такому человеку лучше заниматься" +
                " изобретательством и творчеством. Ян-Оригинальность генерирование идей возникает лишь в сложных" +
                " ситуациях – глобальные, иллюзорные или амбициозные идеи (с точки зрения обывателя кажется," +
                " что человек внезапно предлагает какие-то странные вещи).",
            excess: new EnergyList("При избытке энергии:", ["Хвастовство", "Фантазерство", "Образное и нелогичное мышление",
                "Склонность к преувеличению", "Вычурность"]),
            lack: new EnergyList("При недостатке энергии:", ["Разорванность мышления", "Приоритеты и цели могут меняться слишком быстро",
                "Нарушение концентрации внимания", "Нерешительность", "Рассеянность", "Невнимательность"])
        };
        const emotionalLevel: Section = {
            header: "На эмоциональном уровне",
            text: "энергия Ветра представлена эмоцией Гнев. По этой эмоции чаще всего и определяют человека-ветра." +
                " Инь-Гнев – постоянный, частый и предсказуемый, продолжительный, но не очень сильный. Это раздражительность," +
                " постоянное недовольство по любому поводу, возмущение. Ян-Гнев ярко выраженный, сильный, разрушающий," +
                " но кратковременный. Эта эмоция сопровождается большой мышечной силой. Люди в таком состоянии опасны," +
                " их не следует провоцировать. Но Ян-Гнев импульсивен, кратковременен, возникает внезапно и быстро сменяется другой эмоцией.",
            excess: new EnergyList("При избытке энергии:", ["Агрессивность", "Безрассудство", "Скандальность", "Враждебность", "Нетерпимость",
                "Недовольство", "Нервозность", "Ярость", "Злобность", "Состояние аффекта, протеста"]),
            lack: new EnergyList("При недостатке энергии:", ["Ворчливость", "Перепады настроения", "Раздражительность", "Уныние"])
        };
        const setup: Setup = {
            fullName: fullName,
            shortName: "Ветер",
            color: Constants.LimeGreen,
            description: new Description(baseFeature, mentalLevel, emotionalLevel)
        };

        return setup;
    }
}