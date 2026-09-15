import type { Subject } from "./types";

export const archi: Subject = {
  id: "archi",
  short: "Archi / SE",
  title: "Architecture des ordinateurs et système d’exploitation",
  color: "archi",
  description:
    "Représentation de l’information, CPU, mémoire, processus, ordonnancement, mémoire virtuelle et synchronisation.",
  examFocus:
    "Conversions binaire/hexa, complément à 2, hiérarchie mémoire (AMAT, cache), processus vs threads, calculs d’ordonnancement (attente, rotation), pagination et sémaphores.",
  learn: [
    "Binaire, hexa, complément à deux, flottants (idée)",
    "Modèle de von Neumann, cycle fetch-decode-execute",
    "Cache et AMAT",
    "Processus, threads, états",
    "Ordonnancement CPU (FCFS, SJF, RR, priorité)",
    "Mémoire virtuelle, pagination, TLB",
    "Synchronisation et interblocages",
  ],
  tips: [
    "Complément à 2 : inverser les bits + 1. Le bit de poids fort = signe.",
    "AMAT = T_hit + miss_rate × T_miss. Toujours écrire la formule avant les nombres.",
    "Processus = ressource + espace d’adressage ; thread = chemin d’exécution partagé.",
    "RR : quantum trop petit = trop de commutations ; trop grand ≈ FCFS.",
    "Adresse virtuelle = n° de page + déplacement. TLB miss ≠ page fault.",
    "Interblocage : 4 conditions de Coffman, graphe d’allocation.",
  ],
  chapters: [
    {
      id: "representation",
      title: "Chapitre 1 — Représentation de l’information",
      subtitle: "Bases, complément à 2, hexa",
      durationMin: 35,
      objectives: [
        "Convertir décimal ↔ binaire ↔ hexa",
        "Coder un entier signé en complément à 2",
        "Comprendre un débordement",
      ],
      blocks: [
        {
          t: "h2",
          text: "Bases",
          id: "bases",
        },
        {
          t: "formula",
          name: "Poids",
          tex: "n = \\sum_{k} d_k b^k \\quad (b=2, 8, 10, 16)",
        },
        {
          t: "p",
          text: "Hexa : 4 bits = 1 chiffre hexa. D’où conversions **par paquets de 4 bits**. `0xA3 = 1010 0011`. Octal : paquets de 3 bits.",
        },
        {
          t: "example",
          title: "42 en binaire et hexa",
          blocks: [
            {
              t: "p",
              text: "42 = 32+8+2 = `101010`₂ = `2A`₁₆. Méthode : divisions successives par 2, restes lus à l’envers : 42→21 r0, 10 r1, 5 r0, 2 r1, 1 r0, 0 r1 → 101010.",
            },
          ],
        },
        {
          t: "h2",
          text: "Entiers signés — complément à 2",
          id: "c2",
        },
        {
          t: "p",
          text: "Sur $n$ bits, on représente $[-2^{n-1};\\, 2^{n-1}-1]$. Exemple 8 bits : $[-128; 127]$. Le bit de poids fort (MSB) vaut $-2^{n-1}$.",
        },
        {
          t: "ol",
          items: [
            "Pour +k : écrire k en binaire, padder à n bits.",
            "Pour −k : prendre +k, **inverser tous les bits**, **ajouter 1**.",
            "Ou : $−k \\equiv 2^n - k \\pmod{2^n}$.",
          ],
        },
        {
          t: "example",
          title: "−5 sur 8 bits",
          blocks: [
            {
              t: "p",
              text: "+5 = `00000101`. Inverse `11111010`. +1 → `11111011`. Vérification : $−128 + 64+32+16+8+2+1 = −128+123 = −5$.",
            },
          ],
        },
        {
          t: "callout",
          kind: "exam",
          title: "Overflow",
          body: "127+1 sur 8 bits signés → −128. Ce n’est pas une erreur du processeur : le bit de retenue sort. En C, l’overflow **signé** est undefined behavior ; non signé il est modulo $2^n$.",
        },
        {
          t: "h3",
          text: "Flottants (idée IEEE 754)",
        },
        {
          t: "formula",
          name: "simple précision 32 bits",
          tex: "(-1)^s \\times 1{,}m \\times 2^{e-127}",
          note: "1 bit de signe, 8 d’exposant (biais 127), 23 de mantisse. Tu dois savoir que 0,1 n’est pas exact en binaire.",
        },
      ],
      quiz: [
        {
          id: "h1q1",
          question: "0xF vaut en décimal",
          options: ["15", "16", "8", "255"],
          answer: 0,
          explain: "F = 15. 0xFF = 255.",
        },
        {
          id: "h1q2",
          question: "Sur 8 bits signés, la plus petite valeur est",
          options: ["−255", "−127", "−128", "−256"],
          answer: 2,
          explain: "−2^{7} = −128.",
        },
        {
          id: "h1q3",
          question: "Pour coder −1 en complément à 2 sur 8 bits",
          options: ["10000001", "11111111", "00000001", "10000000"],
          answer: 1,
          explain: "Tous les bits à 1. +1 + (−1) = 0 (retenue ignorée).",
        },
        {
          id: "h1q4",
          question: "4 bits = combien de chiffres hexa ?",
          options: ["2", "1", "4", "8"],
          answer: 1,
          explain: "Un nibble = un chiffre hexa.",
        },
      ],
      exercises: [
        {
          id: "h1e1",
          title: "Conversions",
          difficulty: "facile",
          durationMin: 10,
          prompt:
            "Convertir 100 en binaire et hexa. Coder −18 sur 8 bits (complément à 2).",
          solution:
            "100 = 64+32+4 = 1100100₂ = 64₁₆.\n+18 = 00010010. Inverse 11101101. +1 → 11101110.",
        },
      ],
    },
    {
      id: "cpu",
      title: "Chapitre 2 — Architecture du processeur",
      subtitle: "von Neumann, registres, pipeline",
      durationMin: 30,
      objectives: [
        "Citer les composants du modèle de von Neumann",
        "Décrire le cycle d’instruction",
        "Comprendre le pipeline et un aléa",
      ],
      blocks: [
        {
          t: "h2",
          text: "Von Neumann",
          id: "vn",
        },
        {
          t: "ul",
          items: [
            "**CPU** : UAL (ALU) + unité de contrôle + registres.",
            "**Mémoire unique** instructions + données (vs Harvard : 2 bus).",
            "**Bus** : adresses, données, contrôle.",
            "Goulot : le bus unique (von Neumann bottleneck).",
          ],
        },
        {
          t: "h2",
          text: "Cycle fetch–decode–execute",
          id: "fde",
        },
        {
          t: "ol",
          items: [
            "**Fetch** : PC → adresse, instruction lue, PC += taille.",
            "**Decode** : l’unité de contrôle interprète l’opcode, sélectionne les registres.",
            "**Execute** : ALU, accès mémoire (load/store), branchement (modifie PC).",
            "**Write-back** : résultat écrit dans un registre.",
          ],
        },
        {
          t: "p",
          text: "Registres clés : **PC** (program counter), **IR** (instruction register), **SP** (stack pointer), banc de registres généraux. Un registre est $O(1)$ et très cher/rapide ; la RAM est grande et lente.",
        },
        {
          t: "h2",
          text: "Pipeline",
          id: "pipe",
        },
        {
          t: "p",
          text: "Découper le cycle en étages (ex. 5 : IF ID EX MEM WB) pour n’en finir **une instruction par cycle** en régime (idéal). Accélération théorique ≈ nombre d’étages, limitée par :",
        },
        {
          t: "ul",
          items: [
            "**Aléa de données** : une instruction a besoin du résultat de la précédente → forwarding ou stall.",
            "**Aléa de contrôle** : branchement, le pipeline a déjà fetché le mauvais chemin → flush + predication/prédicteur.",
            "**Aléa de structure** : deux étages veulent la même ressource.",
          ],
        },
        {
          t: "formula",
          name: "CPI et temps CPU",
          tex: "T = N_{\\mathrm{instr}} \\times \\mathrm{CPI} \\times T_{\\mathrm{clock}}",
          note: "RISC vise CPI proche de 1. Un cache miss ou un mispredict augmente le CPI.",
        },
      ],
      quiz: [
        {
          id: "h2q1",
          question: "Le PC contient",
          options: [
            "la dernière donnée ALU",
            "l’adresse de la prochaine instruction",
            "le sommet de pile seulement",
            "le code condition",
          ],
          answer: 1,
          explain: "Program Counter.",
        },
        {
          id: "h2q2",
          question: "Harvard vs von Neumann",
          options: [
            "identique",
            "Harvard sépare mémoires / bus instructions et données",
            "Harvard n’a pas d’ALU",
            "von Neumann n’a pas de registres",
          ],
          answer: 1,
          explain: "Les microcontrôleurs et les caches L1 I/D s’en inspirent.",
        },
        {
          id: "h2q3",
          question: "Un pipeline à 5 étages, idéalement, produit",
          options: ["5 instructions / cycle", "1 instruction / cycle en régime", "CPI=5", "0 aléa"],
          answer: 1,
          explain: "Débit 1, latence 5 cycles.",
        },
        {
          id: "h2q4",
          question: "Un branchement mal prédit provoque",
          options: ["un page fault", "un flush du pipeline (aléa de contrôle)", "un overflow", "un deadlock"],
          answer: 1,
          explain: "Les instructions déjà fetchées du mauvais chemin sont annulées.",
        },
      ],
      exercises: [
        {
          id: "h2e1",
          title: "Temps CPU",
          difficulty: "moyen",
          durationMin: 8,
          prompt:
            "1,2×10⁹ instructions, CPI=1,5, horloge 2 GHz. Temps d’exécution ?",
          solution:
            "T = 1,2e9 × 1,5 / 2e9 = 1,8e9 / 2e9 = 0,9 s.",
        },
      ],
    },
    {
      id: "cache",
      title: "Chapitre 3 — Hiérarchie mémoire et cache",
      subtitle: "Localité, mapping, AMAT",
      durationMin: 40,
      objectives: [
        "Exploiter localité temporelle / spatiale",
        "Distinguer direct-mapped / associatif / ensemble-associatif",
        "Calculer AMAT et un write-back vs write-through",
      ],
      blocks: [
        {
          t: "p",
          text: "Pyramide : registres ⊂ L1 ⊂ L2 ⊂ L3 ⊂ RAM ⊂ SSD ⊂ disque. Plus on descend, plus c’est **grand, lent, pas cher**. Le cache mise sur la **localité**.",
        },
        {
          t: "ul",
          items: [
            "**Temporelle** : une adresse accédée le sera bientôt (boucle).",
            "**Spatiale** : les adresses voisines aussi (tableau).",
            "D’où des **lignes / blocs** de cache (ex. 64 octets), pas un octet isolé.",
          ],
        },
        {
          t: "h2",
          text: "Placement d’un bloc",
          id: "map",
        },
        {
          t: "table",
          cols: ["Politique", "Où va le bloc", "Conflit"],
          rows: [
            ["Correspondance directe", "1 seule ligne : i = (n°bloc) mod (nLignes)", "élevé"],
            ["Entièrement associatif", "n’importe quelle ligne", "faible, comparateurs chers"],
            ["Associatif par ensembles (k-ways)", "dans 1 ensemble, k lignes au choix", "compromis"],
          ],
        },
        {
          t: "p",
          text: "Adresse : `[ tag | index | offset ]`. offset = $\\log_2(\\text{taille de ligne})$. index = $\\log_2(\\text{nombres d’ensembles})$. Le tag identifie le bloc.",
        },
        {
          t: "formula",
          name: "AMAT (Average Memory Access Time)",
          tex: "\\mathrm{AMAT} = T_{\\mathrm{hit}} + m \\cdot T_{\\mathrm{miss}}",
          note: "m = miss rate. On peut chaîner : miss L1 → L2, etc. T_miss L1 = AMAT L2.",
        },
        {
          t: "example",
          title: "L1 : hit 1 ns, miss 5 %, RAM 70 ns",
          blocks: [
            {
              t: "math",
              tex: "\\mathrm{AMAT} = 1 + 0{,}05\\times 70 = 4{,}5\\ \\mathrm{ns}",
            },
            {
              t: "p",
              text: "Sans cache : 70 ns. Avec : 4,5 ns. Gain énorme même avec 5 % de miss. Un miss rate de 1 % donne 1,7 ns.",
            },
          ],
        },
        {
          t: "h3",
          text: "Écritures et remplacement",
        },
        {
          t: "ul",
          items: [
            "**Write-through** : écrit cache + mémoire. Simple, plus de trafic.",
            "**Write-back** : écrit le cache, bit dirty ; recopie à l’éviction.",
            "**Write-allocate** vs no-write-allocate sur miss d’écriture.",
            "Remplacement : LRU (souvent), FIFO, aléatoire. LRU parfait est coûteux → pseudo-LRU.",
          ],
        },
        {
          t: "callout",
          kind: "tip",
          title: "Astuce calcul",
          body: "Taille cache = nEnsembles × k (associativité) × tailleLigne. Toujours vérifier l’unité (Ko = 1024 octets, parfois 1000 au jury — précise 2¹⁰).",
        },
      ],
      quiz: [
        {
          id: "h3q1",
          question: "AMAT =",
          options: ["T_hit × m", "T_hit + m T_miss", "T_miss / m", "CPI"],
          answer: 1,
          explain: "Formule de base.",
        },
        {
          id: "h3q2",
          question: "En direct-mapped, deux blocs qui tombent sur la même ligne",
          options: ["cohabitent", "se chassent (conflit)", "vont en RAM seulement", "fusionnent"],
          answer: 1,
          explain: "Conflict miss.",
        },
        {
          id: "h3q3",
          question: "La localité spatiale justifie",
          options: ["des registres de 1 bit", "des lignes de cache de plusieurs octets", "le swap", "RR"],
          answer: 1,
          explain: "On amène les voisins.",
        },
        {
          id: "h3q4",
          question: "Write-back écrit en mémoire",
          options: ["à chaque store", "à l’éviction d’une ligne dirty", "jamais", "au boot"],
          answer: 1,
          explain: "Le bit dirty décide.",
        },
      ],
      exercises: [
        {
          id: "h3e1",
          title: "AMAT à deux niveaux",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "L1 : 1 ns, miss 4 %. L2 : 10 ns, miss 20 % (des misses L1). RAM : 80 ns. AMAT ?",
          hint: "AMAT = T_L1 + m1 (T_L2 + m2 T_RAM)",
          solution:
            "AMAT = 1 + 0,04 × (10 + 0,20×80) = 1 + 0,04×(10+16) = 1 + 0,04×26 = 1 + 1,04 = 2,04 ns.",
        },
      ],
    },
    {
      id: "processus",
      title: "Chapitre 4 — Processus et threads",
      subtitle: "PCB, états, commutation, user/kernel",
      durationMin: 30,
      objectives: [
        "Distinguer processus et thread",
        "Dessiner le graphe d’états",
        "Comprendre un context switch",
      ],
      blocks: [
        {
          t: "h2",
          text: "Processus",
          id: "proc",
        },
        {
          t: "p",
          text: "Un processus est un **programme en exécution** : code, données, heap, pile, fichiers ouverts, registres, PID. Le **PCB** (process control block) stocke cet état pour le noyau.",
        },
        {
          t: "p",
          text: "États classiques : **new → ready → running → terminated**. De running : **blocked/waiting** (I/O, sem_wait) puis retour ready. **Preempted** : running → ready (fin de quantum).",
        },
        {
          t: "h2",
          text: "Threads",
          id: "thr",
        },
        {
          t: "ul",
          items: [
            "Plusieurs threads d’un même processus **partagent** l’espace d’adressage, les fichiers, le code.",
            "Chacun a sa **pile**, ses registres, son PC.",
            "Création / commutation d’un thread ≪ d’un processus (pas de changement d’espace d’adressage).",
            "Un bug (ex. *p = 0 sauvage) peut corrompre tous les threads du processus.",
            "User-level vs kernel-level threads (modèles 1:1, N:1, M:N).",
          ],
        },
        {
          t: "callout",
          kind: "key",
          title: "Concurrence vs parallélisme",
          body: "Concurrence : plusieurs tâches en cours (entrelacement, 1 cœur). Parallélisme : simultanées (plusieurs cœurs). On peut être concurrent sans être parallèle.",
        },
        {
          t: "h2",
          text: "Appels système et modes",
          id: "sys",
        },
        {
          t: "p",
          text: "**User mode** vs **kernel mode**. Un syscall (read, fork, ioctl) trap vers le noyau. `fork()` duplique le processus (copie à l’écriture). `exec` remplace l’image. `wait` attend un fils. `exit` termine.",
        },
        {
          t: "p",
          text: "Commutation de contexte : sauver registres + PC + état mémoire (tables de pages) du running, restaurer ceux du next. Coût : microsecondes, plus le cache/TLB cold.",
        },
      ],
      quiz: [
        {
          id: "h4q1",
          question: "Les threads d’un processus partagent",
          options: [
            "leurs piles",
            "l’espace d’adressage",
            "leurs PC",
            "rien",
          ],
          answer: 1,
          explain: "Code + heap + fichiers. Pile et registres sont privés.",
        },
        {
          id: "h4q2",
          question: "Un processus en attente d’I/O est",
          options: ["running", "ready", "blocked / waiting", "zombie forcément"],
          answer: 2,
          explain: "Il ne peut pas tourner tant que l’I/O n’est pas finie.",
        },
        {
          id: "h4q3",
          question: "fork() retourne",
          options: [
            "toujours 0",
            "0 dans le fils, PID du fils dans le père",
            "PID du père dans les deux",
            "rien",
          ],
          answer: 1,
          explain: "Classique Unix.",
        },
        {
          id: "h4q4",
          question: "Un context switch est plus lourd pour",
          options: ["deux threads du même processus", "deux processus", "deux registres", "le cache L1 seulement"],
          answer: 1,
          explain: "Changement d’espace d’adressage + TLB.",
        },
      ],
      exercises: [
        {
          id: "h4e1",
          title: "fork",
          difficulty: "moyen",
          durationMin: 8,
          prompt:
            "Combien de fois « X » s’affiche ? printf(\"X\"); fork(); fork();",
          solution:
            "Le printf est AVANT les fork → 1 seule fois « X ».\nSi printf était après les 2 fork : 4 processus, 4 X.\n(Attention au buffering : sans \\n, un fork peut dupliquer le buffer — piège avancé.)",
        },
      ],
    },
    {
      id: "ordonnancement",
      title: "Chapitre 5 — Ordonnancement CPU",
      subtitle: "FCFS, SJF, SRTF, priorité, Round Robin",
      durationMin: 40,
      objectives: [
        "Calculer attente et rotation",
        "Comparer les politiques",
        "Choisir un quantum",
      ],
      blocks: [
        {
          t: "formula",
          name: "Métriques",
          tex: "T_{\\mathrm{rotation}} = T_{\\mathrm{fin}} - T_{\\mathrm{arrivée}},\\quad T_{\\mathrm{attente}} = T_{\\mathrm{rotation}} - T_{\\mathrm{CPU}}",
          note: "Turnaround = waiting + burst (+ I/O). Le jury demande souvent les moyennes.",
        },
        {
          t: "table",
          cols: ["Algo", "Principe", "Préemptif ?", "Risque"],
          rows: [
            ["FCFS / FIFO", "ordre d’arrivée", "non", "effet convoi (un long bloque les courts)"],
            ["SJF", "plus court burst d’abord", "non", "famine des longs ; burst à estimer"],
            ["SRTF", "SJF préemptif", "oui", "idem + overhead"],
            ["Priorité", "plus haute priorité d’abord", "souvent oui", "famine → aging"],
            ["Round Robin", "quantum q, file circulaire", "oui", "q trop petit : overhead ; trop grand ≈ FCFS"],
          ],
        },
        {
          t: "example",
          title: "Trois processus — FCFS",
          blocks: [
            {
              t: "p",
              text: "Arrivés à t=0. Bursts : P1=24, P2=3, P3=3. Ordre P1,P2,P3.",
            },
            {
              t: "p",
              text: "Fins : 24, 27, 30. Attentes : 0, 24, 27. Attente moyenne = $51/3=17$. Rotation moyenne = $(24+27+30)/3=27$.",
            },
            {
              t: "p",
              text: "SJF : P2, P3, P1. Attentes 0, 3, 6. Moyenne **3**. D’où l’intérêt de SJF (mais on ne connaît pas toujours le burst).",
            },
          ],
        },
        {
          t: "h2",
          text: "Round Robin",
          id: "rr",
        },
        {
          t: "p",
          text: "File ready FIFO. Quantum $q$. Si le burst restant $> q$, préemption et retour en queue. Diagramme de Gantt : découpe en tranches de $q$.",
        },
        {
          t: "callout",
          kind: "exam",
          title: "Méthode Gantt",
          body: "1. Table : PID, arrivée, burst restant. 2. Axe du temps. 3. À chaque date, choisir selon la politique (en RR : tête de file). 4. Déduire fin, attente, rotation. 5. Moyennes. **Montre le Gantt** — il est noté.",
        },
        {
          t: "p",
          text: "Multiniveau : files (système, interactif, batch) avec algos différents, parfois aging pour éviter la famine. Completely Fair Scheduler (Linux) : hors programme détaillé, mais « équité / vruntime » se cite.",
        },
      ],
      quiz: [
        {
          id: "h5q1",
          question: "L’effet convoi est typique de",
          options: ["SJF", "FCFS", "RR q→0", "priorité avec aging"],
          answer: 1,
          explain: "Un long en tête bloque les courts.",
        },
        {
          id: "h5q2",
          question: "SRTF est",
          options: ["FCFS préemptif", "SJF préemptif", "RR sans quantum", "non préemptif"],
          answer: 1,
          explain: "Shortest Remaining Time First.",
        },
        {
          id: "h5q3",
          question: "Si le quantum RR tend vers l’infini",
          options: ["on obtient SJF", "on obtient FCFS", "famine garantie", "CPI=0"],
          answer: 1,
          explain: "Plus de préemption.",
        },
        {
          id: "h5q4",
          question: "T_attente =",
          options: [
            "T_fin − T_arrivée",
            "T_rotation − T_CPU",
            "T_CPU − T_arrivée",
            "quantum",
          ],
          answer: 1,
          explain: "Temps passé dans ready (et éventuellement blocked, selon l’énoncé).",
        },
      ],
      exercises: [
        {
          id: "h5e1",
          title: "Gantt RR",
          difficulty: "difficile",
          durationMin: 18,
          prompt:
            "P1, P2, P3 arrivent à 0, bursts 5, 3, 8. RR q=4. Dessiner le Gantt, attentes et rotations.",
          solution:
            "Ordre : P1(4) P2(3) P3(4) P1(1 restant) P3(4 restants).\nGantt : 0-4 P1, 4-7 P2, 7-11 P3, 11-12 P1, 12-16 P3.\nFins : P1=12, P2=7, P3=16.\nRotation : 12, 7, 16 (moy 11,67). Attente = rot − burst : 7, 4, 8 (moy 6,33).",
        },
      ],
    },
    {
      id: "virtuelle",
      title: "Chapitre 6 — Mémoire virtuelle",
      subtitle: "Pagination, TLB, remplacement de pages",
      durationMin: 35,
      objectives: [
        "Traduire une adresse virtuelle",
        "Distinguer TLB miss et page fault",
        "Appliquer FIFO / LRU / Optimal",
      ],
      blocks: [
        {
          t: "p",
          text: "Chaque processus voit un **espace virtuel** contigu. Le matériel + OS traduisent vers la **physique** fragmentée. Avantages : isolation, relocation, plus d’adresses que de RAM (swap).",
        },
        {
          t: "h2",
          text: "Pagination",
          id: "page",
        },
        {
          t: "formula",
          name: "Découpage",
          tex: "\\text{adresse virtuelle} = (\\text{n° page},\\ \\text{offset}),\\quad |\\text{offset}| = \\log_2(\\text{taille page})",
        },
        {
          t: "p",
          text: "Table des pages : entrée = frame (+ bits valid, dirty, referenced, protection). **Page fault** : valid=0 → OS charge depuis le disque, éventuellement évince une victime.",
        },
        {
          t: "example",
          title: "Pages de 4 Ko, adresse 32 bits",
          blocks: [
            {
              t: "p",
              text: "offset = 12 bits ($2^{12}=4096$). n° de page = 20 bits → $2^{20}$ pages. Table à 1 Mo d’entrées : d’où tables **multi-niveaux** et/ou table inversée.",
            },
          ],
        },
        {
          t: "h2",
          text: "TLB",
          id: "tlb",
        },
        {
          t: "p",
          text: "Le **TLB** est un cache associatif des traductions récentes. Hit : 1 accès mémoire (données). Miss : consulter la table (1+ accès) puis le cache de données. **Page fault** : la page n’est pas en RAM — bien plus cher (disque, ms vs ns).",
        },
        {
          t: "callout",
          kind: "warning",
          title: "Ne pas confondre",
          body: "TLB miss ≠ page fault. On peut rater le TLB alors que la page est en mémoire (il suffit de recharger l’entrée). Un page fault implique souvent un TLB miss, pas l’inverse.",
        },
        {
          t: "h2",
          text: "Remplacement de pages",
          id: "repl",
        },
        {
          t: "ul",
          items: [
            "**Optimal** (Belady) : évince la page utilisée le plus tard — irréaliste (oracle), borne inférieure.",
            "**FIFO** : simple, **anomalie de Belady** (plus de frames peut augmenter les faults !).",
            "**LRU** : évince la moins récemment utilisée — bon, coûteux à l’exact.",
            "**Clock / seconde chance** : approximation LRU (bit referenced).",
            "**Working set / thrashing** : trop de faults, le système ne fait plus que pager. Solution : moins de processus (multiprogrammation), plus de RAM.",
          ],
        },
      ],
      quiz: [
        {
          id: "h6q1",
          question: "Taille de page 8 Ko : bits d’offset",
          options: ["8", "12", "13", "16"],
          answer: 2,
          explain: "2^13 = 8192.",
        },
        {
          id: "h6q2",
          question: "Un TLB miss avec bit valid=1 entraîne",
          options: [
            "un aller disque",
            "une lecture de la table des pages (page déjà en RAM)",
            "un kill du processus",
            "un deadlock",
          ],
          answer: 1,
          explain: "Juste une traduction pas en cache.",
        },
        {
          id: "h6q3",
          question: "L’anomalie de Belady concerne",
          options: ["LRU", "FIFO", "Optimal", "Clock toujours"],
          answer: 1,
          explain: "FIFO n’est pas stack algorithm.",
        },
        {
          id: "h6q4",
          question: "Le thrashing c’est",
          options: [
            "un pipeline flush",
            "un trop grand nombre de page faults (le CPU attend le disque)",
            "un quantum trop petit",
            "un overflow",
          ],
          answer: 1,
          explain: "Working set ne tient plus en RAM.",
        },
      ],
      exercises: [
        {
          id: "h6e1",
          title: "FIFO vs LRU",
          difficulty: "moyen",
          durationMin: 15,
          prompt:
            "3 frames. Références : 1 2 3 4 1 2 5 1 2. Compter les page faults FIFO et LRU (frames vides au départ, chaque premier chargement = fault).",
          solution:
            "FIFO faults : 1,2,3,4,1,2,5 → souvent 9 ou 7 selon le décompte des 1,2 finaux (après 5 : frames 5,1,2 déjà ?).\nTrace FIFO (victim = plus ancienne) :\n1 : [1] f\n2 : [1,2] f\n3 : [1,2,3] f\n4 : [4,2,3] f\n1 : [4,1,3] f\n2 : [4,1,2] f\n5 : [5,1,2] f\n1 : hit\n2 : hit\n→ 7 faults.\nLRU : 1,2,3,4,1,2,5,1,2 → 7 faults aussi sur cet exemple (4,1,2 puis 5,1,2). Sur d’autres traces LRU gagne. Le jury veut la TRACE, pas le chiffre magique.",
        },
      ],
    },
    {
      id: "sync",
      title: "Chapitre 7 — Synchronisation et fichiers",
      subtitle: "Race, mutex, sémaphores, deadlock, I/O",
      durationMin: 35,
      objectives: [
        "Identifier une data race",
        "Utiliser mutex et sémaphore (P/V)",
        "Énoncer Coffman et un schéma d’évitement",
      ],
      blocks: [
        {
          t: "h2",
          text: "Section critique",
          id: "cs",
        },
        {
          t: "p",
          text: "Une **data race** : deux threads accèdent à la même variable, au moins un écrit, sans synchro. Conséquence : résultats non déterministes (`count++` n’est pas atomique : load-add-store).",
        },
        {
          t: "ul",
          items: [
            "**Exclusion mutuelle** : au plus un thread dans la SC.",
            "**Progression** : la décision de qui entre ne peut pas être reportée indéfiniment.",
            "**Attente bornée** : pas de famine.",
            "Outils : mutex / lock, sémaphore, moniteur, spinlock (attente active, courte SC).",
          ],
        },
        {
          t: "h2",
          text: "Sémaphores (Dijkstra)",
          id: "sem",
        },
        {
          t: "p",
          text: "`P` (wait, down) : si S>0, S−− ; sinon bloquer. `V` (signal, up) : S++ et réveiller un attendant. Mutex = sémaphore initialisé à 1. Producteur-consommateur : sémaphores `empty`, `full`, `mutex`.",
        },
        {
          t: "code",
          lang: "c",
          title: "Producteur (esquisse)",
          code: "P(empty);\nP(mutex);\n/* deposer */\nV(mutex);\nV(full);",
        },
        {
          t: "h2",
          text: "Interblocage (deadlock)",
          id: "dl",
        },
        {
          t: "p",
          text: "Quatre conditions de **Coffman** (toutes nécessaires) : exclusion mutuelle, détention et attente, non-préemption, attente circulaire. Pour l’éviter : casser une condition (ordonner les locks, allouer tout d’un coup, préempter).",
        },
        {
          t: "p",
          text: "Graphe d’allocation : processus et ressources. Un **cycle** (ressources à 1 exemplaire) ⇒ deadlock. Détection + reprise (kill, rollback) vs prévention vs évitement (banquier — idée : ne jamais entrer dans un état unsafe).",
        },
        {
          t: "callout",
          kind: "exam",
          title: "Starvation vs deadlock",
          body: "Deadlock : personne n’avance (cycle). Starvation : quelqu’un n’avance jamais, les autres oui (priorité sans aging). Un livelock : tout le monde « s’agite » sans progresser (politesse infinie).",
        },
        {
          t: "h2",
          text: "Fichiers et I/O — l’essentiel",
          id: "fs",
        },
        {
          t: "ul",
          items: [
            "Fichier = flux d’octets + métadonnées (inode : taille, droits, pointeurs de blocs).",
            "Répertoire : table nom → inode.",
            "Méthodes d’allocation : contiguë, chaînée, indexée (inode Unix).",
            "Appels : open/read/write/close, lseek. Buffer cache du noyau.",
            "I/O programmée vs interruptions vs DMA (le DMA libère le CPU).",
          ],
        },
      ],
      quiz: [
        {
          id: "h7q1",
          question: "Un mutex est un sémaphore initialisé à",
          options: ["0", "1", "n", "−1"],
          answer: 1,
          explain: "Binaire, une seule entrée.",
        },
        {
          id: "h7q2",
          question: "Les 4 conditions de Coffman sont",
          options: [
            "nécessaires au deadlock (toutes présentes)",
            "suffisantes même une seule",
            "des algos d’ordonnancement",
            "des bits de page",
          ],
          answer: 0,
          explain: "Les 4 simultanément.",
        },
        {
          id: "h7q3",
          question: "count++ sans lock, 2 threads :",
          options: ["toujours correct", "data race (non atomique)", "deadlock", "page fault"],
          answer: 1,
          explain: "Lecture-modif-écriture.",
        },
        {
          id: "h7q4",
          question: "Le DMA sert à",
          options: [
            "traduire les adresses",
            "transférer I/O ↔ RAM sans occuper le CPU à copier chaque octet",
            "ordonnancer RR",
            "compiler",
          ],
          answer: 1,
          explain: "Direct Memory Access.",
        },
      ],
      exercises: [
        {
          id: "h7e1",
          title: "Coffman",
          difficulty: "facile",
          durationMin: 8,
          prompt:
            "Deux processus, chacun détient un lock et attend l’autre. Quelle condition de Coffman crée le cycle ? Comment casser le deadlock par conception ?",
          solution:
            "Attente circulaire (+ les 3 autres, présentes avec des mutex non préemptibles).\nCasser : imposer un ordre global lock A puis B pour tous ; ou trylock + backoff.",
        },
      ],
    },
    {
      id: "fiche",
      title: "Chapitre 8 — Fiche express Archi / SE",
      subtitle: "Formules et distinctions du jour J",
      durationMin: 20,
      objectives: ["Réviser les 12 distinctions qui font les QCM"],
      blocks: [
        {
          t: "h2",
          text: "Distinctions à ne plus jamais rater",
          id: "dist",
        },
        {
          t: "table",
          cols: ["A", "B"],
          rows: [
            ["Processus : espace isolé", "Thread : pile privée, mémoire partagée"],
            ["TLB miss : table des pages", "Page fault : disque / swap"],
            ["Write-through", "Write-back + dirty"],
            ["FCFS : convoi", "SJF : famine possible des longs"],
            ["RR q petit : overhead", "RR q grand ≈ FCFS"],
            ["Deadlock : plus personne", "Starvation : un malheureux"],
            ["User mode", "Kernel mode (syscall / trap)"],
            ["Complément à 2 overflow", "Modulo 2ⁿ en unsigned"],
            ["Cache hit", "Cache miss → AMAT"],
            ["Harvard : 2 mémoires", "von Neumann : 1"],
            ["Mutex = sem 1", "Sémaphore compteur"],
            ["Offset de page", "Numéro de page / frame"],
          ],
        },
        {
          t: "h2",
          text: "Formules",
          id: "f",
        },
        {
          t: "math",
          tex: "T_{CPU}=N\\times CPI\\times T_{clk},\\quad \\mathrm{AMAT}=T_h+m T_m,\\quad T_{att}=T_{rot}-T_{burst}",
        },
        {
          t: "math",
          tex: "\\text{offset}=\\log_2(\\text{page}),\\quad [-2^{n-1};2^{n-1}-1],\\quad 0x\\text{F}=15",
        },
        {
          t: "callout",
          kind: "exam",
          title: "Ordre le jour de l’épreuve",
          body: "Conversions (rapide, sûr) → un Gantt RR/SJF (montre les calculs) → une question AMAT → QCM de vocabulaire. Si une pagination multi-niveaux bloque, passe : c’est long pour 2 points.",
        },
      ],
      quiz: [
        {
          id: "h8q1",
          question: "La première chose à écrire sur un exo d’ordonnancement",
          options: ["la moyenne magique", "le Gantt + table burst restant", "un mutex", "AMAT"],
          answer: 1,
          explain: "Le dessin est noté et évite les erreurs.",
        },
        {
          id: "h8q2",
          question: "−128 sur 8 bits signés",
          options: ["01111111", "10000000", "11111111", "00000000"],
          answer: 1,
          explain: "MSB seul à 1 = −128.",
        },
        {
          id: "h8q3",
          question: "Pour traduire VA → PA on a besoin",
          options: [
            "du CPI",
            "de la table des pages (et idéalement du TLB)",
            "d’un sémaphore",
            "de RR",
          ],
          answer: 1,
          explain: "Cœur de la pagination.",
        },
        {
          id: "h8q4",
          question: "Quatre conditions de Coffman : on casse le deadlock en en cassant",
          options: ["aucune", "au moins une", "les quatre seulement", "le quantum"],
          answer: 1,
          explain: "Nécessaires : il suffit d’en invalider une.",
        },
      ],
      exercises: [
        {
          id: "h8e1",
          title: "Mini mix",
          difficulty: "moyen",
          durationMin: 12,
          prompt:
            "1) 0x3C en décimal et binaire. 2) AMAT hit 2 ns miss 8 % miss penalty 40 ns. 3) Différence TLB miss / page fault en une phrase.",
          solution:
            "1) 0x3C = 3×16+12=60 = 0011 1100₂.\n2) 2+0,08×40=2+3,2=5,2 ns.\n3) TLB miss = traduction absente du cache d’adresses ; page fault = page absente de la RAM.",
        },
      ],
    },
  ],
};
