'use strict';

/**
 * Gera scripts/learn-lang-pack.json com línguas extras + CORE.
 * Uso: node scripts/build-learn-lang-pack.js
 */
const fs = require('fs');
const path = require('path');

const NEW_LANGS = [
  { code: 'nl', label: 'NL', title: 'Nederlands', name: 'Nederlands', charset: 'abcdefghijklmnopqrstuvwxyzáéíóúäëïöü' },
  { code: 'pl', label: 'PL', title: 'Polski', name: 'polski', charset: 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż' },
  { code: 'ru', label: 'RU', title: 'Русский', name: 'русский', charset: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' },
  { code: 'uk', label: 'UK', title: 'Українська', name: 'українська', charset: 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя' },
  { code: 'zh', label: 'ZH', title: '中文', name: '中文', charset: '的一是不了人我在有他这为之大来以个中上们' },
  { code: 'ja', label: 'JA', title: '日本語', name: '日本語', charset: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん' },
  { code: 'ko', label: 'KO', title: '한국어', name: '한국어', charset: '가나다라마바사아자차카타파하' },
  { code: 'ar', label: 'AR', title: 'العربية', name: 'العربية', charset: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي' },
  { code: 'he', label: 'HE', title: 'עברית', name: 'עברית', charset: 'אבגדהוזחטיכלמנסעפצקרשת' },
  { code: 'hi', label: 'HI', title: 'हिन्दी', name: 'हिन्दी', charset: 'अआइईउऊएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह' },
  { code: 'tr', label: 'TR', title: 'Türkçe', name: 'Türkçe', charset: 'abcçdefgğhıijklmnoöprsştuüvyz' },
  { code: 'sv', label: 'SV', title: 'Svenska', name: 'svenska', charset: 'abcdefghijklmnopqrstuvwxyzåäö' },
  { code: 'da', label: 'DA', title: 'Dansk', name: 'dansk', charset: 'abcdefghijklmnopqrstuvwxyzæøå' },
  { code: 'no', label: 'NO', title: 'Norsk', name: 'norsk', charset: 'abcdefghijklmnopqrstuvwxyzæøå' },
  { code: 'fi', label: 'FI', title: 'Suomi', name: 'suomi', charset: 'abcdefghijklmnopqrstuvwxyzäö' },
  { code: 'cs', label: 'CS', title: 'Čeština', name: 'čeština', charset: 'aábcčdďeéěfghiíjklmnňoópqrřsštťuúůvwxyýzž' },
  { code: 'ro', label: 'RO', title: 'Română', name: 'română', charset: 'aăâbcdefghiîjlmnopqrsștțuvwxyz' },
  { code: 'hu', label: 'HU', title: 'Magyar', name: 'magyar', charset: 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz' },
  { code: 'ca', label: 'CA', title: 'Català', name: 'català', charset: 'abcdefghijklmnopqrstuvwxyzàçéèíïóòúü' },
  { code: 'gl', label: 'GL', title: 'Galego', name: 'galego', charset: 'abcdefghijklmnopqrstuvwxyzáéíóúñü' },
  { code: 'eu', label: 'EU', title: 'Euskara', name: 'euskara', charset: 'abcdefghijklmnopqrstuvwxyzñü' },
  { code: 'gn', label: 'GN', title: "Avañe'ẽ (Guarani)", name: 'guarani', charset: "abcdefghijklmnopqrstuvwxyzáéíóú'" },
  { code: 'qu', label: 'QU', title: 'Runasimi (Quechua)', name: 'runasimi', charset: 'abcdefghijklmnopqrstuvwxyzáéíóúñü' },
  { code: 'eo', label: 'EO', title: 'Esperanto', name: 'Esperanto', charset: 'abcdefghijklmnoprstuvz' },
  { code: 'vi', label: 'VI', title: 'Tiếng Việt', name: 'tiếng Việt', charset: 'aáàảãạăâbcdđeéèẻẽẹêghiíìỉĩịklmnoóòỏõọôơpqrstuúùủũụưvyýỳỷỹỵ' },
  { code: 'id', label: 'ID', title: 'Bahasa Indonesia', name: 'bahasa Indonesia', charset: 'abcdefghijklmnopqrstuvwxyz' },
  { code: 'th', label: 'TH', title: 'ไทย', name: 'ไทย', charset: 'กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ' },
  { code: 'hr', label: 'HR', title: 'Hrvatski', name: 'hrvatski', charset: 'abcčćdđefghijklmnoprsštuvzž' },
  { code: 'sk', label: 'SK', title: 'Slovenčina', name: 'slovenčina', charset: 'aáäbcčdďeéfghiíjklĺľmnňoóôpqrŕsštťuúvwxyýzž' },
  { code: 'ga', label: 'GA', title: 'Gaeilge', name: 'Gaeilge', charset: 'aábcdeéfghiílmnoóprstuú' },
  { code: 'cy', label: 'CY', title: 'Cymraeg', name: 'Cymraeg', charset: 'abcdefghijklmnopqrstuvwyz' },
  { code: 'ha', label: 'HA', title: 'Hausa', name: 'Hausa', charset: 'abcdefghijklmnopqrstuvwxyz' },
  { code: 'am', label: 'AM', title: 'Amharic', name: 'Amharic', charset: 'abcdefghijklmnopqrstuvwxyz' },
  { code: 'fa', label: 'FA', title: 'فارسی', name: 'فارسی', charset: 'ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی' },
  { code: 'bn', label: 'BN', title: 'বাংলা', name: 'বাংলা', charset: 'অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ' },
  { code: 'zu', label: 'ZU', title: 'isiZulu', name: 'isiZulu', charset: 'abcdefghijklmnopqrstuvwxyz' }
];

const L = NEW_LANGS.map((x) => x.code);

// Each entry: ptKey -> array of translations in L order (36 langs)
const T = {
  vida: ['leven','życie','жизнь','життя','生命','いのち','생명','حياة','חיים','जीवन','yaşam','liv','liv','liv','elämä','život','viață','élet','vida','vida','bizitza','tekové','kawsay','vivo','su song','hidup','ชีวิต','život','život','saol','bywyd','rai','hiywot','zendegi','জীবন','impilo'],
  semente: ['zaad','nasiono','семя','насіння','种子','種','씨앗','بذرة','זרע','बीज','tohum','frö','frø','frø','siemen','semeno','sămânță','mag','llavor','semente','hazi','ñemoty','muhu','semo','hat','benih','เมล็ด','sjeme','semeno','síol','had','iri','zer','dane','বীজ','imbewu'],
  sementinha: ['zaadje','nasionko','семечко','насінинка','小种子','小さな種','작은 씨앗','بذرة صغيرة','זרעון','छोटा बीज','tohumcuk','litet frö','lille frø','lite frø','pieni siemen','semínko','sămânță mică','magocska','llavoreta','sementiña','hazitxo',"ñemoty'i",'muhucha','semeto','hat nho','benih kecil','เมล็ดเล็ก','sjemenka','semienko','síol beag','hedenyn','iri kadan','tinish zer','dane kuchak','ছোট বীজ','imbewu encane'],
  planta: ['plant','roślina','растение','рослина','植物','植物','식물','نبات','צמח','पौधा','bitki','växt','plante','plante','kasvi','rostlina','plantă','növény','planta','planta','landare',"ka'avo",'qura','planto','cay','tanaman','พืช','biljka','rastlina','planda','planhigyn','shuka','tekl','giyah','গাছ','isitshalo'],
  plantinha: ['plantje','roślinka','растение','рослинка','小植物','小さな植物','작은 식물','نبتة','צמחון','छोटा पौधा','bitkicik','liten planta','lille plante','liten plante','pieni kasvi','rostlinka','plântuță','növényke','planteta','plantiña','landaretxo',"ka'avo'i",'quracha','planteto','cay nho','tanaman kecil','พืชเล็ก','biljčica','rastlinka','planda beag','planhigyn bach','shuka kadan','tinish tekl','giyah kuchak','ছোট গাছ','isitshalwana'],
  plantas: ['planten','rośliny','растения','рослини','植物','植物','식물들','نباتات','צמחים','पौधे','bitkiler','växter','planter','planter','kasvit','rostliny','plante','növények','plantes','plantas','landareak',"ka'avo kuera",'qurakuna','plantoj','cay coi','tanaman','พืช','biljke','rastliny','plandaí','planhigion','tsirrai','tekloch','giyahan','গাছপালা','izitshalo'],
  folha: ['blad','liść','лист','листок','叶子','葉','잎','ورقة','עלה','पत्ती','yaprak','blad','blad','blad','lehti','list','frunză','levél','fulla','folla','hosto','kuatia','raphi','folio','la','daun','ใบ','list','list','duilleog','deilen','ganye','qitel','barg','পাতা','iqabunga'],
  folhas: ['bladeren','liście','листья','листя','叶子','葉','잎들','أوراق','עלים','पत्तियाँ','yapraklar','blad','blade','blader','lehdet','listy','frunze','levelek','fulles','follas','hostoak','kuatia','raphikuna','folioj','la','daun','ใบไม้','listovi','listy','duilleoga','dail','ganye','qiteloch','bargha','পাতা','amaqabunga'],
  raiz: ['wortel','korzeń','корень','корінь','根','根','뿌리','جذر','שורש','जड़','kök','rot','rod','rot','juuri','kořen','rădăcină','gyökér','arrel','raíz','sustrai','tuguái','saphi','radiko','re','akar','ราก','korijen','koreň','fréamh','gwreiddyn','saiwa','sir','rishe','মূল','impande'],
  terra: ['aarde','ziemia','земля','земля','土地','土','땅','أرض','אדמה','मिट्टी','toprak','jord','jord','jord','maa','země','pământ','föld','terra','terra','lur','yvy','allpa','tero','dat','tanah','ดิน','zemlja','zem','talamh','daear','kasa','meret','khak','মাটি','umhlaba'],
  solo: ['bodem','gleba','почва','ґрунт','土壤','土壌','토양','تربة','קרקע','मृदा','zemin','jord','jord','jord','maaperä','půda','sol','talaj','sòl','solo','lurzoru','yvy','allpa','grundo','dat','tanah','ดิน','tlo','pôda','ithir','pridd','kasa','afer','khak','মাটি','inhlabathi'],
  carinho: ['zorg','czułość','забота','турбота','关爱','思いやり','보살핌','حنان','חיבה','स्नेह','şefkat','omsorg','omsorg','omsorg','hellyys','něžnost','duioșie','gondoskodás','carinyo','cariño','goitasun','mborayhu','kuyay','kareco','yeu thuong','kasih','ความเอ็นดู','nježnost','neha','ceannsa','anwyldeb','kauna','enkibkabe','mehr','স্নেহ','uthando'],
  cuidado: ['zorg','opieka','уход','догляд','照料','世話','돌봄','رعاية','טיפול','देखभाल','bakım','omsorg','pleje','pleie','hoito','péče','grijă','gondozás','cura','coidado','zaintza','ñangareko','qhaway','zorgo','cham soc','perawatan','การดูแล','briga','starostlivosť','cúram','gofal','kulawa','enkibkabe','moraghebat','যত্ন','ukunakekela'],
  ciencia: ['wetenschap','nauka','наука','наука','科学','科学','과학','علم','מדע','विज्ञान','bilim','vetenskap','videnskab','vitenskap','tiede','věda','știință','tudomány','ciència','ciencia','zientzia','aranduka','yachay','scienco','khoa hoc','ilmu','วิทยาศาสตร์','znanost','veda','eolaíocht','gwyddoniaeth','kimiyya','sayins','elm','বিজ্ঞান','isayensi'],
  'ciência': null,
  natureza: ['natuur','natura','природа','природа','自然','自然','자연','طبيعة','טבע','प्रकृति','doğa','natur','natur','natur','luonto','příroda','natură','természet','natura','natureza','natura','teko yvy','pacha','naturo','thien nhien','alam','ธรรมชาติ','priroda','príroda','dúlra','natur','yanayi','tefetro','tabiat','প্রকৃতি','imvelo'],
  amizade: ['vriendschap','przyjaźń','дружба','дружба','友谊','友情','우정','صداقة','חברות','मित्रता','dostluk','vänskap','venskab','vennskap','ystävyss','přátelství','prietenie','barátság','amistat','amizade','adiskidetasun','iru','masi','amikeco','tinh ban','persahabatan','มิตรภาพ','prijateljstvo','priateľstvo','cairdeas','cyfeillgarwch','abota','wodajinet','dusti','বন্ধুত্ব','ubungane'],
  familia: ['familie','rodzina','семья',"сім'я",'家庭','家族','가족','عائلة','משפחה','परिवार','aile','familj','familie','familie','perhe','rodina','familie','család','família','familia','familia','tuva','ayllu','familio','gia dinh','keluarga','ครอบครัว','obitelj','rodina','teaghlach','teulu','iyali','beteseb','khanevade','পরিবার','umndeni'],
  'família': null,
  laboratorio: ['laboratorium','laboratorium','лаборатория','лабораторія','实验室','研究室','실험실','مختبر','מעבדה','प्रयोगशाला','laboratuvar','laboratorium','laboratorium','laboratorium','laboratorio','laboratoř','laborator','laboratórium','laboratori','laboratorio','laborategi',"oga neha'a",'yachay wasi','laboratorio','phong thi nghiem','laboratorium','ห้องทดลอง','laboratorij','laboratórium','saotharlann','labordy','dakin gwaji','laboratori','azmayeshgah','পরীক্ষাগার','ilebhu'],
  'laboratório': null,
  inspetor: ['inspecteur','inspektor','инспектор','інспектор','检查员','検査官','검사관','مفتش','מפקח','निरीक्षक','müfettiş','inspektör','inspektør','inspektør','tarkastaja','inspektor','inspector','ellenőr','inspector','inspector','ikuskatzaile','hechakuaaha','qhawaq','inspektoro','thanh tra','inspektur','ผู้ตรวจ','inspektor','inšpektor','cigire','arolygydd','mai duba','teqotatari','bazras','পরিদর্শক','umhloli'],
  mae: ['moeder','matka','мама','мати','母亲','母','어머니','أم','אמא','माँ','anne','mamma','mor','mor','äiti','matka','mamă','anya','mare','nai','ama','sy','mama','patrino','me','ibu','แม่','majka','matka','máthair','mam','uwa','enat','madar','মা','umama'],
  'mãe': null,
  luz: ['licht','światło','свет','світло','光','光','빛','ضوء','אור','प्रकाश','ışık','ljus','lys','lys','valo','světlo','lumină','fény','llum','luz','argi','tendy',"k'ancha",'lumo','anh sang','cahaya','แสง','svjetlo','svetlo','solas','golau','haske','birhan','nur','আলো','ukukhanya'],
  sol: ['zon','słońce','солнце','сонце','太阳','太陽','태양','شمس','שמש','सूरज','güneş','sol','sol','sol','aurinko','slunce','soare','nap','sol','sol','eguzki','kuarahy','inti','suno','mat troi','matahari','ดวงอาทิตย์','sunce','slnko','grian','haul','rana','tsehay','khorshid','সূর্য','ilanga'],
  agua: ['water','woda','вода','вода','水','水','물','ماء','מים','पानी','su','vatten','vand','vann','vesi','voda','apă','víz','aigua','auga','ur','y','yaku','akvo','nuoc','air','น้ำ','voda','voda','uisce','dwr','ruwa','wuha','ab','জল','amanzi'],
  'água': null,
  alegria: ['vreugde','radość','радость','радість','喜悦','喜び','기쁨','فرح','שמחה','आनंद','sevinç','glädje','glæde','glede','ilo','radost','bucurie','öröm','alegria','alegría','poza',"vy'a",'kusikuy','gojo','niem vui','kegembiraan','ความสุข','radost','radosť','áthas','llawenydd','murna','desta','shadi','আনন্দ','injabulo'],
  tristeza: ['verdriet','smutek','грусть','сум','悲伤','悲しみ','슬픔','حزن','עצב','उदासी','üzüntü','sorg','sorg','sorg','suru','smutek','tristețe','szomorúság','tristesa','tristeza','tristura','nanai','llakikuy','malgojo','noi buon','kesedihan','ความเศร้า','tuga','smútok','brón','tristwch','bakin ciki','hazen','gham','দুঃখ','usizi'],
  emocao: ['emotie','emocja','эмоция','емоція','情感','感情','감정','عاطفة','רגש','भावना','duygu','känsla','følelse','følelse','tunne','emoce','emoție','érzelem','emoció','emoción','emozio',"py'a",'sunqu','emocio','cam xuc','emosi','อารมณ์','emocija','emócia','mothúchán','emosiwn','ji','simet','hayajan','আবেগ','imizwa'],
  'emoção': null,
  musica: ['muziek','muzyka','музыка','музика','音乐','音楽','음악','موسيقى','מוזיקה','संगीत','müzik','musik','musik','musikk','musiikki','hudba','muzică','zene','música','música','musika','purahei','taki','muziko','am nhac','musik','ดนตรี','glazba','hudba','ceol','cerddoriaeth','kida','muziqa','musiqi','সঙ্গীত','umculo'],
  'música': null,
  aprender: ['leren','uczyc sie','учиться','вчитися','学习','学ぶ','배우다','يتعلم','ללמוד','सीखना','ogrenmek','lara','laere','laere','oppia','ucit se','a invata','tanulni','aprendre','aprender','ikasi','nemoarandu','yachay','lerni','hoc','belajar','เรียนรู้','uciti','ucit sa','foghlaim','dysgu','koyo','memar','amukhtan','শেখা','ukufunda'],
  ficar: ['blijven','zostac','остаться','залишитись','留下','留まる','머물다','يبقى','להישאר','रहना','kalmak','stanna','blive','bli','jaada','zustat','a ramane','maradni','quedar-se','quedar','geratu','pyta','kay','resti','o lai','tinggal','อยู่','ostati','ostat','fanacht','aros','zauna','meqoyet','mandan','থাকা','ukuhlala'],
  lagrima: ['traan','lza','слеза','сльоза','眼泪','涙','눈물','دمعة','דמעה','आँसू','gozyasi','tar','tare','tare','kyynel','slza','lacrima','konny','llagrima','lagrima','malko','ysa','wiqi','larmo','nuoc mat','air mata','น้ำตา','suza','slza','deoir','deigryn','hawaye','enba','ashk','অশ্রু','inyembezi'],
  'lágrima': null,
  mar: ['zee','morze','море','море','海','海','바다','بحر','ים','समुद्र','deniz','hav','hav','hav','meri','more','mare','tenger','mar','mar','itsaso','para','qucha','maro','bien','laut','ทะเล','more','more','muir','mor','teku','bahr','darya','সমুদ্র','ulwandle'],
  coracao: ['hart','serce','сердце','серце','心','心','마음','قلب','לב','हृदय','kalp','hjarta','hjerte','hjerte','sydan','srdce','inima','sziv','cor','corazon','bihotz','koraso','sunqu','koro','trai tim','hati','หัวใจ','srce','srdce','croi','calon','zuciya','lib','del','হৃদয়','inhliziyo'],
  'coração': null,
  amor: ['liefde','milosc','любовь','любов','爱','愛','사랑','حب','אהבה','प्रेम','ask','karlek','kaerlighed','kjaerlighet','rakkaus','laska','iubire','szeretet','amor','amor','maitasun','mborayhu','munay','amo','tinh yeu','cinta','ความรัก','ljubav','laska','gra','cariad','soyayya','fiqir','eshq','ভালোবাসা','uthando'],
  palavra: ['woord','slowo','слово','слово','词','言葉','단어','كلمة','מילה','शब्द','kelime','ord','ord','ord','sana','slovo','cuvant','szo','paraula','palabra','hitz',"ñe'e",'simi','vorto','tu','kata','คำ','rijec','slovo','focal','gair','kalma','qal','vazhe','শব্দ','igama'],
  poema: ['gedicht','wiersz','стих','вірш','诗','詩','시','قصيدة','שיר','कविता','siir','dikt','digt','dikt','runo','basen','poem','vers','poema','poema','poema',"ñe'epoty",'harawi','poemo','bai tho','puisi','บทกวี','pjesma','basen','dan','cerdd','waka','gitim','sher','কবিতা','inkondlo'],
  crianca: ['kind','dziecko','ребёнок','дитина','孩子','子ども','아이','طفل','ילד','बच्चा','cocuk','barn','barn','barn','lapsi','dite','copil','gyerek','nen','neno','ume','mita','wawa','infano','tre','anak','เด็ก','dijete','dieta','paiste','plentyn','yaro','lij','kudak','শিশু','ingane'],
  'criança': null,
  criancas: ['kinderen','dzieci','дети','діти','孩子们','子どもたち','아이들','أطفال','ילדים','बच्चे','cocuklar','barn','born','barn','lapset','deti','copii','gyerekek','nens','nenos','umeak','mitanguera','wawakuna','infanoj','tre em','anak-anak','เด็กๆ','djeca','deti','paisti','plant','yara','lijoch','kudakan','শিশুরা','izingane'],
  'crianças': null,
  simbiose: ['symbiose','symbioza','симбиоз','симбіоз','共生','共生','공생','تكافل','סימביוזה','सहजीवन','simbiyoz','symbios','symbiose','symbiose','symbioosi','symbioza','simbioza','szimbiozis','simbiosi','simbiose','sinbiosi','ojoaju','hukllakuy','simbiozo','cong sinh','simbiosis','การอยู่ร่วมกัน','simbioza','symbioza','siombois','symbiosis','zaman tare','abro menor','hamzisti','সহজীবন','ukuhlalisana'],
  verde: ['groen','zielony','зелёный','зелений','绿色','緑','초록','أخضر','ירוק','हरा','yesil','gron','gron','gronn','vihrea','zeleny','verde','zold','verd','verde','berde','hovyũ',"q'umir",'verda','xanh','hijau','เขียว','zeleno','zeleny','glas','gwyrdd','kore','arengwade','sabz','সবুজ','luhlaza'],
  amarelo: ['geel','zolty','жёлтый','жовтий','黄色','黄色','노랑','أصفر','צהוב','पीला','sari','gul','gul','gul','keltainen','zluty','galben','sarga','groc','amarelo','hori',"sa'yju","q'illu",'flava','vang','kuning','เหลือง','zuto','zlty','bui','melyn','rawa','bija','zard','হলুদ','phuzi'],
  gota: ['druppel','kropla','капля','крапля','滴','滴','방울','قطرة','טיפה','बूंद','damla','droppe','drabe','drape','pisara','kapka','picatura','csepp','gota','gota','tanta','ysypo',"sut'u",'guto','giot','tetes','หยด','kap','kvapka','braon','defryn','digo','netebtab','ghatre','ফোঁটা','ithonsi'],
  gotas: ['druppels','krople','капли','краплі','水滴','滴','방울들','قطرات','טיפות','बूंदें','damlalar','droppar','draber','draper','pisarat','kapky','picaturi','cseppek','gotes','gotas','tantak','ysypo',"sut'ukuna",'gutoj','giot','tetesan','หยด','kapi','kvapky','braoini','defrynnau','digo-digo','netebtaboch','ghatreha','ফোঁটা','amathonsi'],
  floresta: ['bos','las','лес','ліс','森林','森','숲','غابة','יער','जंगल','orman','skog','skov','skog','metsa','les','padure','erdo','bosc','fraga','baso',"ka'aguy",'sacha','arbaro','rung','hutan','ป่า','suma','les','foraois','coedwig','daji','chaka','jangal','বন','ihlathi'],
  sonho: ['droom','sen','сон','сон','梦','夢','꿈','حلم','חלום','सपना','ruya','drom','drom','drom','uni','sen','vis','alom','somni','sono','amets','kecha','musquy','songo','giac mo','mimpi','ความฝัน','san','sen','aisling','breuddwyd','mafarki','hilm','roya','স্বপ্ন','iphupho'],
  sonhos: ['dromen','sny','сны','сни','梦想','夢','꿈들','أحلام','חלומות','सपने','ruyalar','drommar','dromme','drommer','unelmat','sny','vise','almok','somnis','sonos','ametsak','kecha','musquykuna','songoj','giac mo','mimpi','ความฝัน','snovi','sny','aislingi','breuddwydion','mafarki','hilmoch','royaha','স্বপ্ন','amaphupho'],
  historia: ['verhaal','historia','история','історія','故事','物語','이야기','قصة','סיפור','कहानी','hikaye','historia','historie','historie','tarina','pribeh','poveste','tortenet','historia','historia','istorio',"mombe'u",'willakuy','historio','cau chuyen','cerita','เรื่องราว','prica','pribeh','sceal','stori','labari','tarik','dastan','গল্প','indaba'],
  'história': null,
  equipe: ['team','zespol','команда','команда','团队','チーム','팀','فريق','צוות','टीम','ekip','lag','hold','lag','joukkue','tym','echipa','csapat','equip','equipo','talde','aty','quyllur','teamo','doi','tim','ทีม','tim','tim','foireann','tim','kungiya','budin','tim','দল','iqembu'],
  passarinho: ['vogeltje','ptaszek','птичка','пташка','小鸟','小鳥','작은 새','عصفور','ציפור','चिड़िया','kuscuk','fagel','fugl','fugl','lintunen','ptacek','pasarica','madarka','ocellet','paxarino','txoritxo',"guyra'i",'pisqucha','birdeto','chim nho','burung kecil','นกน้อย','pticica','vtacik','ean beag','aderyn bach','tsuntsu','wef','gonjeshk','পাখি','inyoni'],
  radio: ['radio','radio','радио','радіо','收音机','ラジオ','라디오','راديو','רדיו','रेडियो','radyo','radio','radio','radio','radio','radio','radio','radio','radio','radio','irrati',"pu'aka",'radio','radio','dai','radio','วิทยุ','radio','radio','raidio','radio','rediya','rediyo','radio','রেডিও','umsakazo'],
  'rádio': null,
  diario: ['dagboek','dziennik','дневник','щоденник','日记','日記','일기','يوميات','יומן','डायरी','gunluk','dagbok','dagbog','dagbok','paivakirja','denik','jurnal','naplo','diari','diario','egunkari','kuatia','punchaw qillqa','taglibro','nhat ky','buku harian','บันทึก','dnevnik','dennik','dialann','dyddiadur','littafi','mestawesha','daftarche','ডায়েরি','idayari'],
  'diário': null,
  cultivador: ['kweker','hodowca','выращиватель','вирощувач','种植者','栽培者','재배자','مزارع','מגדל','कृषक','yetistirici','odlare','avler','dyrker','viljelija','pestitel','cultivator','termeszto','cultivador','cultivador','landatzaile','notyhára','tarpukuq','kulturisto','nguoi trong','penanam','ผู้ปลูก','uzgajivac','pestovatel','saothroir','tyfwr','manomi','arso ader','keshavarz','চাষি','umlimi'],
  sorriso: ['glimlach','usmiech','улыбка','посмішка','微笑','笑顔','미소','ابتسامة','חיוך','मुस्कान','gulumse me','leende','smil','smil','hymy','usmev','zambet','mosoly','somriure','sorriso','irribarre','puka','asiy','rideto','nu cuoi','senyum','รอยยิ้ม','osmijeh','usmev','meangadh','gwen','murmushi','fegegta','labkhand','হাসি','ukumamatheka'],
  mascara: ['masker','maska','маска','маска','面具','仮面','가면','قناع','מסכה','मुखौटा','maske','mask','maske','maske','naamio','maska','masca','maszk','mascara','mascara','maskara','aojohei',"q'ipirina",'masko','mat na','topeng','หน้ากาก','maska','maska','masc','mwgwd','abirdi','chinbil','mask','মুখোশ','imaski'],
  'máscara': null,
  universo: ['universum','wszechswiat','вселенная','всесвіт','宇宙','宇宙','우주','كون','יקום','ब्रह्मांड','evren','universum','univers','univers','universumi','vesmir','univers','univerzum','univers','universo','unibertso','ypy','pacha','universo','vu tru','alam semesta','จักรวาล','svemir','vesmir','cruinne','bydysawd','duniya','atsenaf alem','jahan','মহাবিশ্ব','umkhathi'],
  festa: ['feest','swieto','праздник','свято','节日','祭り','축제','حفلة','חגיגה','उत्सव','parti','fest','fest','fest','juhla','oslava','sarbatoare','unnep','festa','festa','jaia',"vy'apave",'raymi','festo','le hoi','pesta','งานเลี้ยง','proslava','oslava','feile','gwyl','buki','beal','jashn','উৎসব','idili']
};

// Accent aliases share the same array
for (const [k, v] of Object.entries(T)) {
  if (v === null) continue;
  // already filled
}
T['ciência'] = T.ciencia;
T['família'] = T.familia;
T['laboratório'] = T.laboratorio;
T['mãe'] = T.mae;
T['água'] = T.agua;
T['emoção'] = T.emocao;
T['música'] = T.musica;
T['lágrima'] = T.lagrima;
T['coração'] = T.coracao;
T['criança'] = T.crianca;
T['crianças'] = T.criancas;
T['história'] = T.historia;
T['rádio'] = T.radio;
T['diário'] = T.diario;
T['máscara'] = T.mascara;

const CORE = {};
for (const [key, arr] of Object.entries(T)) {
  if (!arr) continue;
  if (arr.length !== L.length) {
    console.warn('len mismatch', key, arr.length, 'expected', L.length);
  }
  const map = {};
  for (let i = 0; i < L.length; i++) {
    map[L[i]] = arr[i] || '';
  }
  CORE[key] = map;
}

const out = { NEW_LANGS, CORE };
const outPath = path.join(__dirname, 'learn-lang-pack.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('Wrote', outPath, 'langs', NEW_LANGS.length, 'core', Object.keys(CORE).length);
