// AQLAM Academic Text Database — 100 texts across 7 fields, 3 levels
// Each text: id, field, level (B1/B2/C1), type, title, text, unknown[3], defs[3], hints[3], structure

export const TEXTS = [

// ═══════════════════════════════════════════════════════════════
// BIOLOGY — 15 texts
// ═══════════════════════════════════════════════════════════════
{id:"bio01",field:"biology",level:"B1",type:"textbook",title:"Cell Division",
text:"Cell division is the fundamental process by which a single cell splits into two daughter cells. In mitosis, the cell first duplicates its chromosomes, then separates them into two identical sets before dividing. This process ensures that each daughter cell receives a complete copy of the parent cell's genetic information. Cell division is essential for growth, tissue repair, and reproduction in all living organisms. Errors in this process can lead to uncontrolled cell growth, which is the basis of cancer.",
unknown:["chromosomes","duplicates","uncontrolled"],
defs:["thread-like structures carrying genetic information inside the cell nucleus","makes an exact copy of something","not regulated or limited; growing without stopping"],
hints:["'Chromosomes' in French — identical word.","'Duplique' in French — same Latin root 'duplex'.","'Non contrôlé' in French — same concept."],
structure:"cause-effect"},

{id:"bio02",field:"biology",level:"B1",type:"textbook",title:"Photosynthesis",
text:"Photosynthesis is the process by which green plants convert sunlight into chemical energy stored as glucose. This reaction takes place in the chloroplasts, organelles found in plant cells that contain a green pigment called chlorophyll. The process requires three inputs: carbon dioxide absorbed from the air, water drawn up through the roots, and light energy from the sun. Oxygen is released as a by-product of photosynthesis, making plants essential producers of the air we breathe.",
unknown:["chloroplasts","pigment","by-product"],
defs:["organelles in plant cells where photosynthesis takes place","a natural substance that gives colour to something","a secondary result produced during a manufacturing or chemical process"],
hints:["'Chloroplastes' in French — direct cognate.","'Pigment' in French — identical word.","'Sous-produit' in French — same concept."],
structure:"explanation"},

{id:"bio03",field:"biology",level:"B1",type:"journalism",title:"Gut Bacteria and Health",
text:"Scientists are discovering that the trillions of bacteria living in the human gut do far more than help with digestion. These microscopic organisms, collectively known as the microbiome, appear to influence mood, immune function, and even body weight. Research suggests that a diverse microbiome — one containing many different species — is associated with better health outcomes. Diet plays a crucial role in shaping this community: fibre-rich foods feed beneficial bacteria, while processed foods can reduce microbial diversity.",
unknown:["microbiome","diverse","microbial"],
defs:["the community of microorganisms living in a particular environment, especially the gut","containing many different types or varieties","relating to or caused by microorganisms such as bacteria"],
hints:["'Microbiome' in French — identical word, borrowed from English.","'Diversifié' in French — same Latin root 'diversus'.","'Microbien' in French — direct cognate."],
structure:"claim-evidence"},

{id:"bio04",field:"biology",level:"B2",type:"abstract",title:"Epigenetic Inheritance",
text:"Epigenetics refers to heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. These modifications, including DNA methylation and histone acetylation, regulate which genes are active in a given cell type at a particular time. Evidence is accumulating that some epigenetic marks can be transmitted across generations, challenging the long-held assumption that acquired characteristics cannot be inherited. This has profound implications for our understanding of evolution, development, and the long-term biological consequences of environmental exposures.",
unknown:["heritable","methylation","acetylation"],
defs:["capable of being passed from parent to offspring through genetic transmission","the addition of a methyl group to DNA, typically silencing gene expression","a chemical modification that loosens chromatin structure and promotes gene activity"],
hints:["'Héritable' in French — direct cognate from 'hériter' (to inherit).","'Méthylation' in French — identical scientific term.","'Acétylation' in French — identical scientific term."],
structure:"claim-evidence"},

{id:"bio05",field:"biology",level:"B2",type:"textbook",title:"Membrane Transport",
text:"The cell membrane acts as a selective barrier, controlling the movement of substances into and out of the cell. Small nonpolar molecules such as oxygen and carbon dioxide can diffuse freely across the lipid bilayer, a process called passive transport. However, larger or charged molecules require specialised protein channels or carrier proteins to cross the membrane — a process termed facilitated diffusion. When transport occurs against a concentration gradient, the cell must expend energy in the form of ATP, a mechanism known as active transport.",
unknown:["nonpolar","bilayer","concentration gradient"],
defs:["having no electric charge separation; not attracted to water","a structure composed of two layers, particularly the double-layer of lipid molecules forming cell membranes","the difference in concentration of a substance between two areas, driving movement from high to low concentration"],
hints:["'Non polaire' in French — direct translation.","'Bicouche' in French — 'bi' (two) + 'couche' (layer).","'Gradient de concentration' in French — identical scientific phrase."],
structure:"compare-contrast"},

{id:"bio06",field:"biology",level:"B2",type:"abstract",title:"Neural Plasticity",
text:"Neuroplasticity refers to the brain's remarkable capacity to reorganise its synaptic connections in response to experience, learning, and injury. This property, once thought to be confined to early developmental periods, is now understood to persist throughout the lifespan. Long-term potentiation — the strengthening of synaptic connections following repeated stimulation — is considered the cellular basis of learning and memory formation. Conversely, synaptic pruning, the elimination of underused connections, refines neural circuits and is particularly active during adolescence.",
unknown:["synaptic","potentiation","pruning"],
defs:["relating to the junction between two nerve cells across which nerve signals pass","the process of becoming stronger or more effective","the selective removal or elimination of excess connections to improve efficiency"],
hints:["'Synaptique' in French — direct cognate.","'Potentialisation' in French — same Latin root 'potentia'.","'Élagage' in French — same horticultural metaphor of cutting back."],
structure:"explanation"},

{id:"bio07",field:"biology",level:"C1",type:"abstract",title:"Proteostasis Networks",
text:"Cellular proteostasis — the maintenance of a functional proteome — is achieved through an integrated network of molecular chaperones, ubiquitin-proteasome degradation pathways, and autophagy. Disruption of proteostatic balance underlies a range of age-associated pathologies, including Alzheimer's disease, Parkinson's disease, and type 2 diabetes, wherein misfolded or aggregated proteins accumulate and trigger cellular dysfunction. The heat shock response and the unfolded protein response represent two major adaptive programmes that cells deploy to counter proteotoxic stress, offering attractive therapeutic targets for intervention.",
unknown:["proteome","chaperones","proteotoxic"],
defs:["the complete set of proteins expressed by a cell, tissue, or organism at a given time","proteins that assist in the folding and assembly of other proteins without becoming part of the final structure","relating to damage caused by abnormal proteins or protein aggregates within the cell"],
hints:["'Protéome' in French — direct cognate from Greek 'proteios' (primary).","'Chaperonnes' in French — same word, borrowed from French 'chaperon' (a guardian).","'Protéotoxique' in French — direct scientific cognate."],
structure:"problem-solution"},

{id:"bio08",field:"biology",level:"C1",type:"abstract",title:"Quorum Sensing",
text:"Quorum sensing is a cell-to-cell communication mechanism that enables bacteria to coordinate gene expression as a function of population density. Individual bacteria continuously produce and release small signalling molecules called autoinducers; when the population reaches a threshold density, accumulated autoinducers bind to receptor proteins and trigger coordinated behavioural changes across the entire colony. Quorum sensing regulates diverse phenotypes including biofilm formation, virulence factor production, and bioluminescence, making it an attractive target for novel antimicrobial strategies that disrupt bacterial communication rather than directly killing cells.",
unknown:["autoinducers","phenotypes","bioluminescence"],
defs:["signalling molecules produced by bacteria that accumulate and trigger collective responses when a threshold concentration is reached","the observable physical and biochemical characteristics of an organism as determined by both genetics and environment","the production and emission of light by a living organism as a result of a chemical reaction"],
hints:["'Auto-inducteurs' in French — direct scientific translation.","'Phénotypes' in French — direct cognate from Greek 'phainein' (to show).","'Bioluminescence' in French — identical word."],
structure:"explanation"},

{id:"bio09",field:"biology",level:"B1",type:"journalism",title:"Sleep and Memory",
text:"While we sleep, the brain is far from idle. Neuroscientists have discovered that the sleeping brain actively consolidates memories formed during the day, transferring information from short-term storage in the hippocampus to long-term storage in the cortex. This process appears to occur primarily during deep slow-wave sleep and during rapid eye movement sleep, each stage handling different types of memory. Chronic sleep deprivation does not merely cause tiredness; it impairs the formation of new memories, reduces creativity, and may accelerate neurodegenerative disease.",
unknown:["consolidates","hippocampus","neurodegenerative"],
defs:["strengthens and stabilises memories by transferring them to long-term storage","a region of the brain associated with the formation of new memories and spatial navigation","relating to the progressive loss of structure or function of nerve cells in the brain"],
hints:["'Consolide' in French — direct cognate from Latin 'consolidare'.","'Hippocampe' in French — identical word (also means seahorse in French, same Greek origin).","'Neurodégénératif' in French — direct cognate."],
structure:"explanation"},

{id:"bio10",field:"biology",level:"B2",type:"textbook",title:"Hormonal Signalling",
text:"Hormones are chemical messengers secreted by endocrine glands directly into the bloodstream, enabling communication between distant organs. Unlike neurotransmitters, which act locally at synapses, hormones can travel throughout the body and influence multiple target tissues simultaneously. Hormone action depends on the presence of specific receptor proteins on target cells; cells lacking the appropriate receptor are unresponsive to that hormone. The insulin-glucose feedback system exemplifies hormonal regulation: rising blood glucose stimulates insulin secretion from the pancreas, which in turn promotes glucose uptake by muscle and adipose tissue.",
unknown:["endocrine","receptor","adipose"],
defs:["relating to glands that secrete hormones directly into the blood rather than through a duct","a protein molecule on or inside a cell that specifically binds to a hormone or other signalling molecule","relating to fat tissue stored beneath the skin and around organs"],
hints:["'Endocrine' in French — identical word.","'Récepteur' in French — direct cognate from Latin 'recipere' (to receive).","'Adipeux' in French — same Latin root 'adeps' (fat)."],
structure:"explanation"},

{id:"bio11",field:"biology",level:"C1",type:"abstract",title:"Horizontal Gene Transfer",
text:"Horizontal gene transfer (HGT) — the movement of genetic material between organisms other than by vertical descent from parent to offspring — represents a major driver of prokaryotic evolution and genome plasticity. The three principal mechanisms, transformation, transduction, and conjugation, enable bacteria to rapidly acquire novel traits including antibiotic resistance, virulence determinants, and metabolic capabilities. The clinical implications of HGT are profound: the lateral spread of resistance genes across bacterial species boundaries has rendered multiple classes of antibiotics ineffective, constituting one of the most pressing challenges in contemporary infectious disease medicine.",
unknown:["prokaryotic","transduction","conjugation"],
defs:["relating to organisms lacking a membrane-bound nucleus, primarily bacteria and archaea","the transfer of genetic material between bacteria via a bacteriophage (virus) as an intermediate vector","direct cell-to-cell transfer of genetic material through physical contact between donor and recipient bacteria"],
hints:["'Procaryote' in French — direct cognate from Greek 'pro' (before) + 'karyon' (nucleus).","'Transduction' in French — identical scientific term.","'Conjugaison' in French — same Latin root 'conjugare' (to join together)."],
structure:"explanation"},

{id:"bio12",field:"biology",level:"B1",type:"textbook",title:"Enzymes",
text:"Enzymes are biological catalysts — proteins that speed up chemical reactions in living cells without being consumed in the process. Each enzyme has an active site, a specifically shaped region that binds only to its complementary substrate molecule, much like a lock accepting only the right key. This specificity means that each enzyme typically catalyses only one type of reaction. Factors such as temperature and pH can alter the shape of an enzyme's active site, reducing or destroying its catalytic activity — a process called denaturation.",
unknown:["catalysts","substrate","denaturation"],
defs:["substances that speed up chemical reactions without being consumed or permanently changed","the molecule upon which an enzyme acts during a chemical reaction","the process by which a protein loses its shape and function due to heat, acidity, or other environmental changes"],
hints:["'Catalyseurs' in French — direct cognate from Greek 'katalyein'.","'Substrat' in French — identical scientific term.","'Dénaturation' in French — direct cognate."],
structure:"explanation"},

{id:"bio13",field:"biology",level:"B2",type:"journalism",title:"Gut-Brain Axis",
text:"The gut-brain axis describes the bidirectional communication network linking the enteric nervous system of the gastrointestinal tract with the central nervous system. The vagus nerve serves as the primary anatomical conduit for this exchange, transmitting signals in both directions between gut and brain. Emerging evidence suggests that gut microbiota composition significantly modulates this axis, influencing not only gastrointestinal function but also mood regulation, anxiety, and cognitive performance. Disruptions to the gut-brain axis have been implicated in conditions as diverse as irritable bowel syndrome, depression, and autism spectrum disorder.",
unknown:["enteric","conduit","modulates"],
defs:["relating to or denoting the intestine","a channel or pipe for conveying something from one place to another","regulates or adjusts the strength or nature of something"],
hints:["'Entérique' in French — direct cognate from Greek 'enteron' (intestine).","'Conduit' in French — identical word (French origin meaning 'channel').","'Module' in French — direct cognate from Latin 'modulari' (to regulate)."],
structure:"explanation"},

{id:"bio14",field:"biology",level:"C1",type:"abstract",title:"Telomere Biology",
text:"Telomeres are repetitive nucleotide sequences capping the ends of linear chromosomes, protecting them from degradation and illegitimate recombination. With each cell division, telomeres shorten progressively due to the end-replication problem, until they reach a critically short length that triggers replicative senescence or apoptosis. Telomerase, a reverse transcriptase enzyme capable of extending telomere length, is active in germline cells and most cancers but is largely repressed in somatic tissue, creating a fundamental tension between tumour suppression and cellular longevity. Pharmacological modulation of telomerase activity therefore represents a double-edged therapeutic strategy.",
unknown:["senescence","apoptosis","germline"],
defs:["the biological ageing of cells, characterised by an irreversible loss of the capacity to divide","programmed cell death, a regulated process by which cells are dismantled and removed without triggering inflammation","the lineage of cells that give rise to gametes (eggs and sperm) and can transmit genetic information to the next generation"],
hints:["'Sénescence' in French — direct cognate from Latin 'senescere' (to grow old).","'Apoptose' in French — identical scientific term from Greek 'apoptosis' (falling off).","'Lignée germinale' in French — 'germinal' shares the same Latin root 'germen' (sprout, seed)."],
structure:"problem-solution"},

{id:"bio15",field:"biology",level:"B2",type:"abstract",title:"Innate Immunity",
text:"The innate immune system provides the first line of defence against pathogens, responding within minutes to hours of infection through pattern recognition receptors that detect conserved microbial structures. Unlike adaptive immunity, which generates highly specific responses tailored to individual pathogens, innate immunity operates through a limited repertoire of broadly reactive mechanisms including phagocytosis, complement activation, and the release of pro-inflammatory cytokines. Although non-specific, innate immune responses are essential for containing infections during the days required for adaptive responses to develop, and for providing the activating signals that initiate lymphocyte proliferation.",
unknown:["phagocytosis","complement","cytokines"],
defs:["the process by which cells engulf and digest foreign particles, bacteria, or dead cells","a system of blood proteins that enhances the ability of antibodies and phagocytic cells to clear pathogens","small signalling proteins released by cells that modulate immune responses and inflammation"],
hints:["'Phagocytose' in French — direct cognate from Greek 'phagein' (to eat) + 'kytos' (cell).","'Complément' in French — same Latin root 'complere' (to complete/fill).","'Cytokines' in French — identical scientific term from Greek 'kytos' (cell) + 'kinein' (to move)."],
structure:"compare-contrast"},

// ═══════════════════════════════════════════════════════════════
// PHYSICS — 15 texts
// ═══════════════════════════════════════════════════════════════
{id:"phy01",field:"physics",level:"B1",type:"textbook",title:"Newton's Laws of Motion",
text:"Newton's three laws of motion describe the relationship between a body and the forces acting upon it. The first law states that an object remains at rest or in uniform motion unless acted upon by an external force — a property called inertia. The second law quantifies this relationship: the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass. The third law establishes that for every action there is an equal and opposite reaction, explaining phenomena from rocket propulsion to the recoil of a firearm.",
unknown:["inertia","proportional","recoil"],
defs:["the tendency of an object to resist changes to its state of motion","having a constant ratio to another quantity; increasing or decreasing together in the same ratio","the backward movement of a gun when it is fired, caused by Newton's third law"],
hints:["'Inertie' in French — direct cognate from Latin 'iners' (inactive).","'Proportionnel' in French — identical root.","'Recul' in French — same concept of backward movement."],
structure:"explanation"},

{id:"phy02",field:"physics",level:"B1",type:"journalism",title:"Black Holes Explained",
text:"A black hole is a region of space where gravity is so intense that nothing — not even light — can escape once it crosses the boundary known as the event horizon. Black holes form when massive stars collapse at the end of their lives, compressing enormous amounts of matter into an infinitely dense point called a singularity. Despite their reputation for destruction, black holes play a fundamental role in the structure of galaxies: most large galaxies, including our own Milky Way, harbour a supermassive black hole at their centre. Recent advances in telescope technology have allowed astronomers to capture the first actual image of a black hole.",
unknown:["singularity","harbour","supermassive"],
defs:["a point of infinite density at the centre of a black hole where known physical laws break down","to contain or shelter something within itself","extremely or incomparably massive; describing black holes millions or billions of times the mass of the sun"],
hints:["'Singularité' in French — direct cognate from Latin 'singularis' (unique).","'Abriter' in French — different word but the metaphor of shelter is similar.","'Supermassif' in French — direct compound cognate."],
structure:"explanation"},

{id:"phy03",field:"physics",level:"B1",type:"textbook",title:"Waves and Energy",
text:"Waves are disturbances that transfer energy from one point to another without transferring matter. They can be classified as transverse — where the disturbance is perpendicular to the direction of travel, as in light and water waves — or longitudinal, where the disturbance is parallel to the direction of travel, as in sound waves. Key wave properties include wavelength, the distance between successive peaks; frequency, the number of complete waves passing a point per second; and amplitude, which determines the energy carried by the wave. The relationship between wave speed, frequency, and wavelength is expressed by the fundamental wave equation.",
unknown:["perpendicular","longitudinal","amplitude"],
defs:["at a right angle to a given line or surface","running in the same direction as the length or main axis; parallel to the direction of travel","the maximum displacement of a wave from its rest position, related to the wave's energy"],
hints:["'Perpendiculaire' in French — direct cognate from Latin 'perpendiculum' (plumb line).","'Longitudinal' in French — identical word from Latin 'longitudo' (length).","'Amplitude' in French — identical word from Latin 'amplitudo' (breadth)."],
structure:"explanation"},

{id:"phy04",field:"physics",level:"B2",type:"textbook",title:"Special Relativity",
text:"Einstein's special theory of relativity, published in 1905, rests on two postulates: that the laws of physics are identical for all observers in uniform motion, and that the speed of light in a vacuum is constant regardless of the motion of the source or observer. These deceptively simple premises lead to counterintuitive consequences: time dilation, whereby moving clocks run slower than stationary ones; length contraction, where objects moving at high velocities appear shorter along their direction of motion; and mass-energy equivalence, captured in the iconic equation E=mc².",
unknown:["postulates","dilation","equivalence"],
defs:["fundamental assumptions or premises accepted without proof as the basis of reasoning","the stretching or expanding of something, particularly time as experienced by a moving observer","the state of being equal in value, function, or meaning; here, the interchangeability of mass and energy"],
hints:["'Postulats' in French — direct cognate from Latin 'postulare' (to demand, to assume).","'Dilatation' in French — direct cognate from Latin 'dilatare' (to spread out).","'Équivalence' in French — direct cognate from Latin 'aequivalens'."],
structure:"claim-evidence"},

{id:"phy05",field:"physics",level:"B2",type:"abstract",title:"Quantum Tunnelling",
text:"Quantum tunnelling is a phenomenon in which a particle traverses a potential energy barrier that it classically could not surmount — as if passing through a solid wall. This occurs because quantum particles are described by wave functions with non-zero probability amplitudes on both sides of a barrier. Tunnelling plays a crucial role in numerous physical and biological processes: it enables nuclear fusion in stars at temperatures far below those classically required, underpins the operation of tunnel diodes in electronics, and has been invoked to explain the remarkable speed of enzyme-catalysed reactions.",
unknown:["traverses","surmount","underpins"],
defs:["travels across or through something","to overcome a difficulty or obstacle; to get over something","supports or forms the basis of something"],
hints:["'Traverse' in French — identical word from Latin 'transversus' (across).","'Surmonter' in French — same prefix 'sur-' (over) and concept.","'Sous-tend' in French — different phrasing but the idea of underlying support is identical."],
structure:"explanation"},

{id:"phy06",field:"physics",level:"B1",type:"journalism",title:"The Higgs Boson",
text:"The Higgs boson, often called the 'God particle' in popular media — a nickname its discoverer dislikes — is an elementary particle that plays a central role in explaining why other particles have mass. According to the Standard Model of particle physics, the universe is permeated by an invisible Higgs field; as particles move through this field, they interact with it to different degrees, and this interaction is what gives them mass. The Higgs boson is the quantum of this field — the particle-like ripple that signals its existence. Its discovery at the Large Hadron Collider in 2012 was one of the greatest achievements in the history of physics.",
unknown:["permeated","quantum","elementary"],
defs:["spread throughout and present in every part of something","the minimum discrete unit of a physical quantity, such as energy or a field","fundamental; not derived from or reducible to anything more basic"],
hints:["'Imprégné' in French — similar concept of being filled throughout.","'Quantum' in French — identical (borrowed from Latin 'quantum', meaning 'how much').","'Élémentaire' in French — direct cognate from Latin 'elementarius'."],
structure:"explanation"},

{id:"phy07",field:"physics",level:"B2",type:"textbook",title:"Thermodynamic Entropy",
text:"Entropy, in thermodynamics, measures the degree of disorder or randomness in a system. The second law of thermodynamics states that in any spontaneous process, the total entropy of an isolated system can only increase or remain constant, never decrease. This asymmetry between past and future — the thermodynamic arrow of time — explains why heat flows from hot to cold, why gases expand to fill available space, and why ordered structures spontaneously decay. Boltzmann's statistical interpretation links entropy to the number of microstates corresponding to a macroscopic state: the more ways a state can be realised, the higher its entropy.",
unknown:["spontaneous","microstates","macroscopic"],
defs:["occurring naturally without external energy input; happening of its own accord","the specific microscopic configurations of a system's individual particles that correspond to a given macroscopic state","relating to large-scale properties of a system that are directly observable, as opposed to atomic or molecular scale"],
hints:["'Spontané' in French — direct cognate from Latin 'sponte' (of one's own will).","'Microétats' in French — direct compound: 'micro' + 'états' (states).","'Macroscopique' in French — direct cognate from Greek 'makros' (large) + 'skopein' (to view)."],
structure:"explanation"},

{id:"phy08",field:"physics",level:"C1",type:"abstract",title:"Dark Energy",
text:"Dark energy is the hypothetical form of energy postulated to permeate all of space and to be responsible for the observed accelerating expansion of the universe. First inferred from Type Ia supernova observations in 1998, dark energy is estimated to constitute approximately 68% of the total energy content of the observable universe, yet its fundamental nature remains entirely unknown. The cosmological constant Λ — originally introduced and later retracted by Einstein — is the simplest theoretical description, representing a uniform energy density inherent to space itself. Alternative proposals, including quintessence models involving dynamic scalar fields, have thus far yielded no definitive observational support.",
unknown:["postulated","quintessence","scalar"],
defs:["proposed or assumed as a hypothesis without direct evidence, particularly as a theoretical explanation","a hypothetical form of dark energy described by a dynamic field that varies in space and time, as opposed to a fixed cosmological constant","in physics, a quantity described by a single number at each point in space and time, having magnitude but no direction"],
hints:["'Postulé' in French — direct cognate from Latin 'postulare'.","'Quintessence' in French — identical word, originally the fifth classical element in medieval philosophy.","'Scalaire' in French — direct cognate from Latin 'scalaris' (of a ladder, hence graduated)."],
structure:"problem-solution"},

{id:"phy09",field:"physics",level:"C1",type:"abstract",title:"Superconductivity",
text:"Superconductivity is a quantum mechanical phenomenon in which certain materials exhibit zero electrical resistance and expel magnetic fields below a characteristic critical temperature. In conventional superconductors, explained by BCS theory, pairs of electrons with opposite momenta and spins form Cooper pairs that move coherently through the lattice without scattering. High-temperature superconductors, discovered in 1986, remain incompletely understood; their pairing mechanism does not conform to BCS predictions and is believed to involve strongly correlated electron interactions. The technological promise of room-temperature superconductivity — enabling lossless power transmission, ultrafast computation, and levitated transport — has driven decades of intensive materials research.",
unknown:["expel","coherently","correlated"],
defs:["to drive out or force something to leave","in a unified, coordinated manner, acting as a single entity","showing a mutual relationship such that changes in one variable are associated with changes in another"],
hints:["'Expulser' in French — direct cognate from Latin 'expellere' (to drive out).","'De façon cohérente' in French — 'cohérent' shares the same Latin root 'cohaerere' (to stick together).","'Corrélé' in French — direct cognate from Latin 'correlatus'."],
structure:"explanation"},

{id:"phy10",field:"physics",level:"B1",type:"textbook",title:"Nuclear Fission",
text:"Nuclear fission is the process in which a heavy atomic nucleus splits into two smaller nuclei, releasing a large amount of energy. When a neutron strikes a uranium-235 nucleus, the nucleus becomes unstable and divides, releasing two or three additional neutrons. These neutrons can then strike other uranium nuclei, triggering further fission reactions in a self-sustaining chain reaction. The energy released comes from the conversion of a small amount of mass into energy, as described by Einstein's equation E=mc². Nuclear power plants exploit controlled chain reactions to generate electricity, while nuclear weapons use uncontrolled reactions.",
unknown:["fission","unstable","self-sustaining"],
defs:["the splitting of a heavy atomic nucleus into two or more lighter nuclei","not stable; likely to change or break apart","capable of continuing without external input once started"],
hints:["'Fission' in French — identical word from Latin 'fissio' (splitting).","'Instable' in French — direct cognate with same prefix.","'Auto-entretenu' in French — 'auto' (self) + 'entretenu' (maintained)."],
structure:"explanation"},

{id:"phy11",field:"physics",level:"B2",type:"journalism",title:"Gravitational Waves",
text:"Gravitational waves are ripples in the fabric of spacetime produced by the acceleration of massive objects. Predicted by Einstein's general theory of relativity in 1916, they were not directly detected until 2015, when the LIGO observatory recorded the signature of two merging black holes 1.3 billion light-years away. The detection required measuring a distortion in space smaller than one-thousandth the diameter of a proton — an extraordinary feat of precision engineering. Gravitational wave astronomy has since opened an entirely new observational window on the universe, enabling the study of events invisible to electromagnetic telescopes.",
unknown:["spacetime","electromagnetic","observatory"],
defs:["the four-dimensional continuum in which all events occur, combining three dimensions of space with one of time","relating to waves that include visible light, radio waves, X-rays, and all other forms of radiation","a building or facility equipped with instruments for observing astronomical or meteorological phenomena"],
hints:["'Espace-temps' in French — direct compound translation.","'Électromagnétique' in French — direct cognate.","'Observatoire' in French — identical word from Latin 'observare' (to watch)."],
structure:"narrative"},

{id:"phy12",field:"physics",level:"C1",type:"abstract",title:"Quantum Chromodynamics",
text:"Quantum chromodynamics (QCD) is the theory of the strong nuclear force, describing the interactions between quarks and gluons — the fundamental constituents of protons, neutrons, and other hadrons. Unlike electromagnetism, where force decreases with distance, the strong force exhibits confinement: as quarks are separated, the interaction energy increases until it becomes energetically favourable to create new quark-antiquark pairs rather than separate the originals. This property ensures that quarks are never observed in isolation. At extremely high temperatures, as in the early universe or heavy-ion collisions, quarks and gluons become deconfined and form a quark-gluon plasma.",
unknown:["hadrons","confinement","deconfined"],
defs:["composite subatomic particles made of quarks held together by the strong force, including protons and neutrons","the property of the strong force whereby quarks cannot be isolated or observed individually","having escaped from confinement; existing freely as individual particles rather than bound within larger structures"],
hints:["'Hadrons' in French — identical word from Greek 'hadros' (thick, strong).","'Confinement' in French — identical word from Latin 'confinis' (bordering).","'Déconfiné' in French — direct antonym with French prefix 'dé-' (un-)."],
structure:"explanation"},

{id:"phy13",field:"physics",level:"B1",type:"textbook",title:"Electromagnetism",
text:"Electricity and magnetism were once considered separate forces, but James Clerk Maxwell's equations, published in 1865, revealed them to be two aspects of a single electromagnetic force. A changing electric field produces a magnetic field, and a changing magnetic field produces an electric field — this mutual generation allows electromagnetic waves to propagate through space without any medium. Maxwell's equations predicted that light itself is an electromagnetic wave, a prediction spectacularly confirmed by experiment. The unification of electricity and magnetism became a template for the later unification of fundamental forces in modern physics.",
unknown:["propagate","medium","unification"],
defs:["to spread and travel through space or a material","a substance through which something travels or is transmitted","the combining of separate theories or forces into a single coherent framework"],
hints:["'Propager' in French — direct cognate from Latin 'propagare' (to extend).","'Milieu' in French — the French word for medium/environment.","'Unification' in French — identical word from Latin 'unificare' (to make one)."],
structure:"narrative"},

{id:"phy14",field:"physics",level:"B2",type:"textbook",title:"Plasma Physics",
text:"Plasma, often called the fourth state of matter, is an ionised gas in which electrons have been stripped from atoms, creating a mixture of free electrons and positively charged ions. It is by far the most abundant form of visible matter in the universe, comprising the interiors of stars, solar winds, nebulae, and lightning. Unlike ordinary gases, plasmas conduct electricity and respond strongly to electromagnetic fields, exhibiting complex collective behaviours including plasma waves, instabilities, and self-organisation into structures such as filaments and sheets. Harnessing plasma for controlled nuclear fusion — replicating the energy source of the sun — is the central goal of fusion energy research.",
unknown:["ionised","nebulae","instabilities"],
defs:["converted into ions by the removal or addition of electrons; electrically charged","clouds of gas and dust in space, often sites of star formation or remnants of stellar explosions","conditions in which small disturbances grow rather than dissipate, leading to turbulent or unpredictable behaviour"],
hints:["'Ionisé' in French — direct cognate from Greek 'ion' (going).","'Nébuleuses' in French — direct cognate from Latin 'nebula' (mist, cloud).","'Instabilités' in French — direct cognate from Latin 'instabilis'."],
structure:"explanation"},

{id:"phy15",field:"physics",level:"C1",type:"abstract",title:"Loop Quantum Gravity",
text:"Loop quantum gravity (LQG) is a candidate theory of quantum gravity that attempts to reconcile general relativity with quantum mechanics by quantising spacetime itself. In LQG, space is not continuous but composed of discrete, indivisible units at the Planck scale — approximately 10⁻³⁵ metres. The geometry of spacetime is described by a network of spin foam structures, and gravitational interactions emerge from the combinatorial properties of this network. Unlike string theory, LQG requires no extra dimensions and makes no assumptions beyond those of general relativity and quantum mechanics, but it has yet to produce testable predictions that would distinguish it from competing approaches.",
unknown:["reconcile","quantising","combinatorial"],
defs:["to make different theories, ideas, or demands compatible with each other","converting a continuous physical quantity into discrete, indivisible units described by quantum mechanics","relating to the mathematical study of counting, arrangement, and combination of objects or structures"],
hints:["'Réconcilier' in French — direct cognate from Latin 'reconciliare' (to bring back together).","'Quantifier' in French — direct cognate; in French physics, 'quantification' refers to the same process.","'Combinatoire' in French — identical term used in mathematics."],
structure:"problem-solution"},

// ═══════════════════════════════════════════════════════════════
// COMPUTER SCIENCE — 15 texts
// ═══════════════════════════════════════════════════════════════
{id:"cs01",field:"cs",level:"B1",type:"textbook",title:"Binary and Data",
text:"Computers store and process all information as binary data — sequences of 0s and 1s called bits. A bit is the smallest unit of data; eight bits form a byte, which can represent 256 different values. This binary representation underlies everything from simple text and images to complex videos and programs. The reason computers use binary rather than decimal is physical: electronic circuits are most reliably built to distinguish between two states — on and off — corresponding to high and low voltage. Converting information into binary and back is done automatically by software layers invisible to most users.",
unknown:["binary","representation","underlies"],
defs:["a number system using only two digits, 0 and 1, corresponding to the two states of electronic switches","the way in which something is described or expressed in a particular system","forms the basis or foundation of something"],
hints:["'Binaire' in French — direct cognate from Latin 'binarius' (consisting of two).","'Représentation' in French — identical word.","'Sous-tend' in French — same concept of forming the foundation."],
structure:"explanation"},

{id:"cs02",field:"cs",level:"B1",type:"textbook",title:"Operating Systems",
text:"An operating system is the software that manages a computer's hardware and provides services for application programs. It acts as an intermediary between users and the computer hardware, handling tasks such as memory allocation, process scheduling, file management, and input-output operations. Without an operating system, every application would need to directly control the hardware — an impractical arrangement that would make software development extremely complex. Common operating systems include Windows, macOS, and Linux; mobile devices typically run iOS or Android. The operating system runs continuously in the background, invisible to most users.",
unknown:["intermediary","allocation","scheduling"],
defs:["a person or thing that acts as a link between two parties to help reach agreement or share information","the process of distributing resources among competing processes or users","the process of deciding the order and timing in which processes are given access to a shared resource"],
hints:["'Intermédiaire' in French — direct cognate from Latin 'intermedius' (in between).","'Allocation' in French — identical word from Latin 'allocare' (to assign).","'Ordonnancement' in French — different word but 'scheduler' borrows from Old French 'eschedule'."],
structure:"explanation"},

{id:"cs03",field:"cs",level:"B1",type:"journalism",title:"Artificial Intelligence Today",
text:"Artificial intelligence has moved from science fiction to everyday reality with remarkable speed. Today's AI systems can recognise speech, translate languages, diagnose diseases from medical images, and generate realistic text and images. Most modern AI is based on machine learning — systems that learn from large datasets rather than following explicitly programmed rules. The recent success of large language models, trained on vast amounts of text from the internet, has demonstrated that scaling up data and computing power can produce systems with surprisingly general capabilities. However, experts disagree about how close such systems are to genuine understanding or consciousness.",
unknown:["diagnose","explicitly","scaling"],
defs:["to identify the nature of a disease or problem through examination and analysis","in a clear and detailed manner, leaving nothing implied","increasing in size, quantity, or capacity, particularly of computational resources and datasets"],
hints:["'Diagnostiquer' in French — direct cognate from Greek 'diagnostikos' (able to distinguish).","'Explicitement' in French — direct cognate from Latin 'explicitus' (unfolded, clear).","'Mise à l'échelle' in French — different phrase; 'échelle' (scale) shares Latin root 'scala'."],
structure:"explanation"},

{id:"cs04",field:"cs",level:"B2",type:"textbook",title:"Sorting Algorithms",
text:"Sorting algorithms arrange data into a specific order — typically ascending or descending — and their efficiency is critical for the performance of many larger systems. The simplest algorithms, such as bubble sort, compare adjacent elements and swap them if they are in the wrong order, repeating until the entire array is sorted. While easy to implement, bubble sort has O(n²) time complexity, making it impractical for large datasets. More sophisticated algorithms such as merge sort and quicksort achieve O(n log n) complexity by recursively dividing the problem into smaller subproblems, dramatically reducing the number of comparisons required.",
unknown:["adjacent","recursively","complexity"],
defs:["next to or immediately following something","in a way that involves a function calling itself repeatedly with simpler versions of the original problem","in computer science, a measure of how the runtime or memory requirements of an algorithm grow as input size increases"],
hints:["'Adjacent' in French — identical word from Latin 'adjacens' (lying near).","'Récursivement' in French — direct cognate from Latin 'recursivus' (running back).","'Complexité' in French — direct cognate from Latin 'complexus' (intertwined)."],
structure:"compare-contrast"},

{id:"cs05",field:"cs",level:"B2",type:"textbook",title:"Database Normalisation",
text:"Database normalisation is the process of organising a relational database to reduce redundancy and improve data integrity. The process involves decomposing tables into smaller, more focused tables and defining relationships between them using foreign keys. Normal forms provide a set of criteria: first normal form requires that each column contain atomic values; second normal form additionally requires that every non-key attribute be fully dependent on the primary key; third normal form further requires that non-key attributes be independent of each other. Properly normalised databases reduce anomalies that can occur during insert, update, and delete operations.",
unknown:["redundancy","decomposing","anomalies"],
defs:["the unnecessary duplication of data within a database","breaking down something complex into simpler constituent parts","irregularities or inconsistencies in a database that lead to incorrect or unexpected behaviour during data operations"],
hints:["'Redondance' in French — direct cognate from Latin 'redundantia' (overflow).","'Décomposer' in French — direct cognate from Latin 'decomponere' (to take apart).","'Anomalies' in French — identical word from Greek 'anomalia' (unevenness)."],
structure:"explanation"},

{id:"cs06",field:"cs",level:"B2",type:"abstract",title:"Cryptographic Hash Functions",
text:"A cryptographic hash function maps an input of arbitrary length to a fixed-size output called a hash or digest. Secure hash functions must satisfy three properties: preimage resistance, meaning it is computationally infeasible to recover the input from the hash; collision resistance, meaning it is infeasible to find two different inputs producing the same hash; and the avalanche effect, whereby a small change in input produces a completely different output. These properties make hash functions essential building blocks of digital signatures, password storage, and blockchain technology, where they ensure data integrity without revealing the underlying data.",
unknown:["arbitrary","infeasible","integrity"],
defs:["based on random choice or personal whim; not following any rule or constraint","not possible to do or carry out within a reasonable time or cost using available computational resources","the quality of being whole and uncorrupted; the state of data being accurate and unaltered"],
hints:["'Arbitraire' in French — direct cognate from Latin 'arbitrarius' (depending on the will).","'Infaisable' in French — same prefix 'in-' (not) + 'faisable' (feasible, from Latin 'facere').","'Intégrité' in French — identical word from Latin 'integritas' (wholeness)."],
structure:"explanation"},

{id:"cs07",field:"cs",level:"C1",type:"abstract",title:"Distributed Consensus",
text:"Achieving consensus among distributed nodes in the presence of failures is one of the fundamental problems of distributed computing. The FLP impossibility result proved that no deterministic algorithm can guarantee consensus in an asynchronous system if even one node may fail. Practical systems circumvent this theoretical barrier through various means: Paxos and Raft achieve consensus under the assumption that a majority of nodes remain available and communicating; Byzantine fault-tolerant protocols additionally handle nodes that actively send incorrect or conflicting messages. Blockchain consensus mechanisms such as proof-of-work and proof-of-stake represent novel approaches that trade classical safety guarantees for probabilistic finality.",
unknown:["deterministic","asynchronous","Byzantine"],
defs:["producing the same output for a given input every time, with no randomness or unpredictability","operating without a global clock or timing constraints, where messages may arrive in any order after any delay","relating to failures where nodes send incorrect, misleading, or conflicting information to different parts of the system, named after the Byzantine Generals problem"],
hints:["'Déterministe' in French — direct cognate from Latin 'determinare' (to fix boundaries).","'Asynchrone' in French — direct cognate from Greek 'a-' (not) + 'syn-' (together) + 'chronos' (time).","'Byzantin' in French — identical word; both French and English borrowed the term from Byzantine history."],
structure:"problem-solution"},

{id:"cs08",field:"cs",level:"B1",type:"journalism",title:"How the Internet Works",
text:"The internet is a global network of networks, connecting billions of devices through a common set of protocols. When you send a message or visit a website, your data is broken into small packets, each of which may travel a different route across the network before being reassembled at the destination. This packet-switching approach, rather than maintaining a dedicated connection for each communication, makes the internet robust and efficient. The TCP/IP protocol suite governs how packets are addressed, routed, and reassembled. The World Wide Web, often confused with the internet itself, is just one application running on top of this infrastructure — a system of linked documents accessed via web browsers.",
unknown:["protocols","robust","infrastructure"],
defs:["sets of rules governing how data is transmitted between computers in a network","strong and unlikely to fail or break down, even under difficult conditions","the fundamental physical and organisational structures — hardware, software, and systems — needed for network operation"],
hints:["'Protocoles' in French — direct cognate from Greek 'protokollon' (first sheet).","'Robuste' in French — direct cognate from Latin 'robustus' (strong as oak).","'Infrastructure' in French — identical word from Latin 'infra' (below) + 'structura' (building)."],
structure:"explanation"},

{id:"cs09",field:"cs",level:"B2",type:"textbook",title:"Object-Oriented Programming",
text:"Object-oriented programming (OOP) is a programming paradigm that organises software around objects — self-contained units combining data (attributes) and behaviour (methods). The four core principles of OOP are encapsulation, hiding the internal state of objects and exposing only necessary interfaces; inheritance, allowing new classes to derive properties and methods from existing ones; polymorphism, enabling objects of different types to be treated through a common interface; and abstraction, representing complex systems through simplified models. OOP promotes code reusability, modularity, and maintainability, making it the dominant paradigm for large-scale software development.",
unknown:["encapsulation","polymorphism","modularity"],
defs:["the practice of bundling data and methods within a class and restricting direct access to some components","the ability of different object types to be processed through the same interface, with each responding in its own way","the design principle of breaking a system into independent, interchangeable components that can be developed and tested separately"],
hints:["'Encapsulation' in French — identical word from Latin 'capsula' (small container).","'Polymorphisme' in French — direct cognate from Greek 'polys' (many) + 'morphe' (form).","'Modularité' in French — direct cognate from Latin 'modulus' (small measure)."],
structure:"explanation"},

{id:"cs10",field:"cs",level:"C1",type:"abstract",title:"Reinforcement Learning",
text:"Reinforcement learning (RL) is a paradigm in which an agent learns to make decisions by interacting with an environment and receiving scalar reward signals. The agent's objective is to learn a policy — a mapping from states to actions — that maximises expected cumulative reward over time. The fundamental challenge of RL is the exploration-exploitation trade-off: the agent must balance exploring unfamiliar state-action pairs to discover potentially superior strategies against exploiting known rewarding actions. Deep reinforcement learning, combining RL with deep neural networks as function approximators, has achieved superhuman performance on complex tasks including Atari games, the game of Go, and protein structure prediction.",
unknown:["scalar","cumulative","exploitation"],
defs:["a quantity represented by a single number rather than a vector of multiple values","increasing by successive additions; built up over time","taking advantage of known information or strategies rather than exploring new possibilities"],
hints:["'Scalaire' in French — direct cognate from Latin 'scalaris'.","'Cumulatif' in French — direct cognate from Latin 'cumulare' (to heap up).","'Exploitation' in French — identical word from Latin 'exploitare' (to make use of)."],
structure:"explanation"},

{id:"cs11",field:"cs",level:"B2",type:"journalism",title:"Cybersecurity Threats",
text:"The landscape of cybersecurity threats has expanded dramatically as more of human activity moves online. Ransomware attacks, in which criminals encrypt victims' data and demand payment for its release, have devastated hospitals, critical infrastructure, and governments. Phishing — sending deceptive emails that trick users into revealing credentials — remains the most common initial attack vector. Nation-state actors conduct sophisticated persistent intrusions targeting intellectual property, electoral systems, and critical infrastructure. The shortage of cybersecurity professionals — estimated at several million globally — means that demand for these skills will remain intense for the foreseeable future.",
unknown:["ransomware","phishing","intrusions"],
defs:["malicious software that encrypts a victim's files and demands payment for the decryption key","a social engineering attack using fraudulent communications that appear to come from a trusted source to steal sensitive information","unauthorised entries into computer systems, typically conducted covertly over extended periods"],
hints:["'Rançongiciel' in French — French coined their own term: 'rançon' (ransom) + 'logiciel' (software).","'Hameçonnage' in French — French coined 'hameçon' (fish hook) as metaphor; English kept the Greek 'phishing'.","'Intrusions' in French — identical word from Latin 'intrusio' (a thrusting in)."],
structure:"explanation"},

{id:"cs12",field:"cs",level:"C1",type:"abstract",title:"Formal Verification",
text:"Formal verification is the process of using mathematical proof techniques to establish the correctness of hardware designs or software programs with respect to a formal specification. Model checking exhaustively explores all possible states of a finite system to verify that specified properties — typically expressed in temporal logic — hold universally. Theorem proving, an alternative approach, requires constructing machine-checkable proofs that a system satisfies its specification. The exponential state-space explosion problem limits model checking to relatively small systems, while theorem proving requires significant human expertise to guide the proof search. Nevertheless, formal verification has achieved notable successes in verifying microprocessor designs, flight control software, and cryptographic protocols.",
unknown:["specification","temporal","exponential"],
defs:["a precise, formal description of the intended behaviour or properties of a system","relating to time; in logic, temporal operators express properties about the ordering of events over time","involving or characterised by exponential growth, where each step multiplies the previous value by a constant factor"],
hints:["'Spécification' in French — direct cognate from Latin 'specificare' (to make specific).","'Temporel' in French — direct cognate from Latin 'temporalis' (of time).","'Exponentiel' in French — direct cognate from Latin 'exponens' (setting out)."],
structure:"explanation"},

{id:"cs13",field:"cs",level:"B1",type:"textbook",title:"Computer Memory",
text:"Computer memory comes in two main forms: primary memory, which is directly accessible by the processor, and secondary memory, which provides long-term storage. RAM (Random Access Memory) is the primary memory used for running programs; it is fast but volatile, losing its contents when power is removed. The processor's cache is even faster but much smaller, storing copies of frequently used data for rapid access. Secondary memory — hard drives and solid-state drives — is persistent and far larger than RAM but slower. The memory hierarchy reflects a fundamental trade-off: speed and proximity to the processor come at the cost of capacity and expense.",
unknown:["volatile","persistent","hierarchy"],
defs:["losing its stored information when the power supply is interrupted","continuing to exist over time; not lost when power is removed","an arrangement of things ranked according to their relative importance, speed, or cost"],
hints:["'Volatile' in French — identical word from Latin 'volatilis' (flying, fleeting).","'Persistant' in French — direct cognate from Latin 'persistere' (to stand firm).","'Hiérarchie' in French — direct cognate from Greek 'hierarchia' (rule of a high priest)."],
structure:"compare-contrast"},

{id:"cs14",field:"cs",level:"B2",type:"abstract",title:"Graph Theory Applications",
text:"Graph theory, a branch of mathematics studying networks of connected nodes and edges, provides the theoretical foundation for a remarkable range of computational problems. Social networks, the World Wide Web, road systems, and molecular structures can all be modelled as graphs. Fundamental graph algorithms — breadth-first search, depth-first search, Dijkstra's shortest-path algorithm, and minimum spanning tree algorithms — underpin applications from GPS navigation to network routing and compiler optimisation. NP-complete graph problems, such as the travelling salesman problem and graph colouring, are of particular interest because their apparent intractability has profound implications for cryptography and computational complexity theory.",
unknown:["intractability","spanning","compilers"],
defs:["the quality of being extremely difficult or impossible to solve efficiently using known algorithms","covering or extending across the entire structure; a spanning tree connects all nodes with minimum edges","programs that translate source code written in a high-level programming language into machine code"],
hints:["'Intraitabilité' in French — 'intraitable' (intractable) shares the Latin root 'tractare' (to handle).","'Couvrant' in French — 'arbre couvrant' is the French term for spanning tree.","'Compilateurs' in French — direct cognate from Latin 'compilare' (to plunder, later to compile)."],
structure:"explanation"},

{id:"cs15",field:"cs",level:"C1",type:"abstract",title:"Transformer Architecture",
text:"The transformer architecture, introduced in the 2017 paper 'Attention Is All You Need', has become the dominant paradigm for natural language processing and increasingly for computer vision and other domains. Its central innovation is the self-attention mechanism, which allows each position in a sequence to attend to all other positions, capturing long-range dependencies without the sequential processing constraints of recurrent networks. Multi-head attention enables the model to jointly attend to information from different representational subspaces at different positions. Pre-training large transformers on massive text corpora via next-token prediction, followed by fine-tuning on downstream tasks, has produced models of remarkable generality and capability.",
unknown:["paradigm","dependencies","corpora"],
defs:["a typical example or pattern serving as a model; the dominant theoretical framework in a field","relationships between elements in a sequence where the meaning or value of one depends on another","in linguistics, large collections of texts used to train or study language models"],
hints:["'Paradigme' in French — direct cognate from Greek 'paradeigma' (pattern, example).","'Dépendances' in French — direct cognate from Latin 'dependentia'.","'Corpus' (singular) / 'corpora' (plural) in French — identical Latin word, used in both languages."],
structure:"explanation"},

// ═══════════════════════════════════════════════════════════════
// MATHEMATICS — 13 texts
// ═══════════════════════════════════════════════════════════════
{id:"mat01",field:"mathematics",level:"B1",type:"textbook",title:"Limits and Continuity",
text:"The concept of a limit is foundational to calculus and mathematical analysis. Informally, the limit of a function f(x) as x approaches a value a is the value that f(x) gets closer and closer to, without necessarily reaching it. A function is continuous at a point if its limit equals its actual value there — meaning there are no jumps, holes, or vertical asymptotes. Continuity is important because many powerful theorems of calculus require it: the intermediate value theorem guarantees that a continuous function must pass through every value between its minimum and maximum.",
unknown:["foundational","asymptotes","intermediate"],
defs:["forming the essential foundation of a subject; fundamental","lines that a curve approaches but never touches, representing values the function cannot reach","coming between two things in time, place, or value; in mathematics, referring to values between two endpoints"],
hints:["'Fondamental' in French — direct cognate from Latin 'fundamentum' (foundation).","'Asymptotes' in French — identical word from Greek 'asymptotos' (not falling together).","'Intermédiaire' in French — direct cognate from Latin 'intermedius'."],
structure:"explanation"},

{id:"mat02",field:"mathematics",level:"B1",type:"textbook",title:"Probability Fundamentals",
text:"Probability measures the likelihood of events occurring, expressed as a number between 0 (impossible) and 1 (certain). The probability of an event is calculated by dividing the number of favourable outcomes by the total number of equally likely outcomes. Two events are mutually exclusive if they cannot both occur simultaneously — in this case, the probability of either occurring is the sum of their individual probabilities. Conditional probability measures how the probability of one event changes given that another has already occurred. Bayes' theorem provides a powerful framework for updating probabilities as new evidence arrives.",
unknown:["mutually exclusive","conditional","framework"],
defs:["describing two events that cannot both occur at the same time","depending on certain conditions; expressing probability with the assumption that some other event has occurred","a basic structure or system within which something operates or is organised"],
hints:["'Mutuellement exclusifs' in French — direct translation; 'mutuellement' from Latin 'mutuus' (reciprocal).","'Conditionnel' in French — direct cognate from Latin 'condicionalis'.","'Cadre' in French — different word but same concept of a structure providing context."],
structure:"explanation"},

{id:"mat03",field:"mathematics",level:"B2",type:"textbook",title:"Linear Algebra: Eigenvalues",
text:"Eigenvalues and eigenvectors are fundamental concepts in linear algebra with profound applications across science and engineering. Given a square matrix A, a non-zero vector v is an eigenvector if multiplying it by A merely scales it by a scalar factor λ — the eigenvalue — without changing its direction. Geometrically, eigenvectors are the special directions that a linear transformation preserves, while eigenvalues measure how much stretching or compression occurs. Principal component analysis, Google's PageRank algorithm, and quantum mechanics all rely crucially on eigenvalue decomposition to identify the most important directions or modes in high-dimensional data.",
unknown:["scalar","decomposition","component"],
defs:["a single numerical value, as opposed to a vector with both magnitude and direction","the process of breaking a matrix down into simpler constituent parts that reveal its fundamental properties","one of the parts that make up a whole; in mathematics, a projected representation along a specific axis"],
hints:["'Scalaire' in French — direct cognate from Latin 'scalaris'.","'Décomposition' in French — direct cognate from Latin 'decomponere'.","'Composante' in French — direct cognate from Latin 'componens' (putting together)."],
structure:"explanation"},

{id:"mat04",field:"mathematics",level:"B2",type:"abstract",title:"Topology",
text:"Topology is the branch of mathematics concerned with properties of space that are preserved under continuous deformations — stretching, bending, and twisting, but not tearing or gluing. Two shapes are topologically equivalent if one can be transformed into the other without cutting or puncturing. The classic example is that a coffee mug and a donut are topologically identical, both having exactly one hole. Topological invariants such as the Euler characteristic and homotopy groups provide tools for classifying spaces and detecting holes of different dimensions. Topology has found unexpected applications in data analysis, condensed matter physics, and the study of the shape of the universe.",
unknown:["deformations","invariants","homotopy"],
defs:["changes in shape or form produced by stretching, bending, or other continuous transformations","properties of a mathematical object that remain unchanged under the transformations being studied","a concept in topology relating to the continuous deformation of paths or shapes into one another"],
hints:["'Déformations' in French — direct cognate from Latin 'deformare' (to change form).","'Invariants' in French — identical mathematical term from Latin 'invarians' (not varying).","'Homotopie' in French — direct cognate from Greek 'homos' (same) + 'topos' (place)."],
structure:"explanation"},

{id:"mat05",field:"mathematics",level:"B1",type:"journalism",title:"The Beauty of Prime Numbers",
text:"Prime numbers — integers greater than one divisible only by themselves and one — have fascinated mathematicians for more than two thousand years. Despite their simple definition, primes exhibit mysterious patterns and remain at the centre of unsolved problems. The distribution of primes becomes less dense as numbers grow larger, yet they never disappear entirely — there are infinitely many of them, as Euclid proved elegantly. The Riemann Hypothesis, one of the Millennium Prize Problems carrying a one-million-dollar reward, concerns the precise distribution of primes and has resisted proof for over 160 years. Primes are also the foundation of modern cryptography, protecting trillions of dollars of online transactions daily.",
unknown:["density","resisted","cryptography"],
defs:["the quantity of things within a given area or space; how closely packed or frequent something is","successfully opposed or withstood something over a period of time","the practice of securing communication through mathematical techniques that make information unreadable to unauthorised parties"],
hints:["'Densité' in French — direct cognate from Latin 'densitas' (thickness).","'Résisté' in French — direct cognate from Latin 'resistere' (to stand against).","'Cryptographie' in French — direct cognate from Greek 'kryptos' (hidden)."],
structure:"narrative"},

{id:"mat06",field:"mathematics",level:"B2",type:"textbook",title:"Differential Equations",
text:"A differential equation is an equation relating a function to its derivatives, describing how a quantity changes over time or space. Ordinary differential equations (ODEs) involve functions of a single variable, while partial differential equations (PDEs) involve functions of multiple variables. Newton's laws, Maxwell's equations, the Schrödinger equation, and models of population dynamics and heat flow are all expressed as differential equations. The existence and uniqueness theorem guarantees that under suitable conditions, an ODE has exactly one solution satisfying given initial conditions — a result fundamental to deterministic modelling in science and engineering.",
unknown:["derivatives","uniqueness","deterministic"],
defs:["mathematical quantities representing the rate of change of a function with respect to one of its variables","the property of having exactly one solution; no other possibility exists given the same starting conditions","having only one possible outcome for given initial conditions; not random or probabilistic"],
hints:["'Dérivées' in French — direct cognate from Latin 'derivare' (to draw off, to derive).","'Unicité' in French — direct cognate from Latin 'unicus' (unique, only one).","'Déterministe' in French — direct cognate."],
structure:"explanation"},

{id:"mat07",field:"mathematics",level:"C1",type:"abstract",title:"Gödel's Incompleteness Theorems",
text:"Gödel's incompleteness theorems, proved in 1931, constitute the most profound results in the foundations of mathematics. The first theorem states that any consistent formal system powerful enough to express basic arithmetic contains true statements that cannot be proved within that system. The second theorem states that such a system cannot prove its own consistency. These results shattered the programme of Hilbert, who had hoped to establish mathematics on a complete and consistent axiomatic foundation. The proof technique — Gödel numbering, which encodes statements about a system within the system itself — demonstrated that self-reference is an irreducible feature of sufficiently expressive logical systems.",
unknown:["consistent","axiomatic","self-reference"],
defs:["free from internal contradictions; a system in which no statement can be proved both true and false","relating to axioms — statements accepted without proof as the starting points of a logical system","the capacity of a statement or system to refer to or describe itself"],
hints:["'Cohérent' in French — direct cognate from Latin 'cohaerens' (sticking together).","'Axiomatique' in French — direct cognate from Greek 'axioma' (that which is thought worthy).","'Auto-référence' in French — direct compound: 'auto' (self) + 'référence'."],
structure:"narrative"},

{id:"mat08",field:"mathematics",level:"B2",type:"textbook",title:"Game Theory",
text:"Game theory is the mathematical study of strategic decision-making among rational agents. A game is defined by its players, the strategies available to each, and the payoffs resulting from each combination of strategies. The Nash equilibrium — named after mathematician John Nash — is a set of strategies from which no player benefits by unilaterally changing their strategy, given that other players maintain theirs. Game theory models diverse phenomena from economic competition and evolutionary biology to international relations and auction design. The Prisoner's Dilemma illustrates a central insight: individually rational choices can lead to collectively suboptimal outcomes.",
unknown:["rational","unilaterally","suboptimal"],
defs:["based on logic and reason; making decisions to maximise one's own benefit given available information","by one side alone, without the agreement or involvement of the other parties","less than the best possible; not achieving the maximum available benefit"],
hints:["'Rationnel' in French — direct cognate from Latin 'rationalis' (endowed with reason).","'Unilatéralement' in French — direct cognate from Latin 'uni-' (one) + 'lateralis' (of a side).","'Sous-optimal' in French — direct compound: 'sous-' (under/below) + 'optimal'."],
structure:"explanation"},

{id:"mat09",field:"mathematics",level:"C1",type:"abstract",title:"Category Theory",
text:"Category theory, sometimes called 'the mathematics of mathematics', provides a unifying language for describing mathematical structures and the relationships between them. A category consists of objects and morphisms — structure-preserving maps between objects — satisfying laws of associativity and identity. Functors are maps between categories that preserve categorical structure; natural transformations are maps between functors. The power of the approach lies in its abstraction: concepts that appear structurally similar across different mathematical domains can be unified under categorical descriptions, revealing deep connections between algebra, topology, logic, and computation. Category theory has found significant applications in programming language theory and formal semantics.",
unknown:["morphisms","functors","semantics"],
defs:["structure-preserving maps between objects in a category, analogous to functions between sets","mappings between categories that preserve their structure, sending objects to objects and morphisms to morphisms","the study of meaning in language or formal systems; in computing, the study of what programs mean"],
hints:["'Morphismes' in French — direct cognate from Greek 'morphe' (form) + '-ismos' (process).","'Foncteurs' in French — direct cognate from Latin 'functor' (one who performs).","'Sémantique' in French — direct cognate from Greek 'semantikos' (significant)."],
structure:"explanation"},

{id:"mat10",field:"mathematics",level:"B1",type:"textbook",title:"Statistics: Distributions",
text:"A probability distribution describes how the values of a random variable are distributed across possible outcomes. The normal distribution — the famous bell curve — appears throughout nature and statistics because the Central Limit Theorem guarantees that the average of many independent random variables approaches a normal distribution regardless of the original distribution. The mean describes the centre of a distribution, the standard deviation measures its spread, and skewness quantifies its asymmetry. Understanding distributions is essential for hypothesis testing, confidence interval construction, and virtually all applications of inferential statistics.",
unknown:["inferential","skewness","asymmetry"],
defs:["relating to the process of drawing conclusions about a population based on a sample","a measure of the asymmetry of a probability distribution around its mean, indicating whether data is skewed left or right","the quality of being unequal or imbalanced on two sides; lacking mirror-image symmetry"],
hints:["'Inférentiel' in French — direct cognate from Latin 'inferre' (to carry in, to conclude).","'Asymétrie' in French — same concept; direct cognate from Greek 'a-' (not) + 'symmetria'.","'Asymétrie' in French — same word!"],
structure:"explanation"},

{id:"mat11",field:"mathematics",level:"B2",type:"abstract",title:"Number Theory",
text:"Number theory is the branch of pure mathematics devoted to the study of integers and integer-valued functions. Fundamental results include the unique factorisation theorem — every integer greater than one can be expressed uniquely as a product of prime numbers — and the infinitude of primes. Modular arithmetic, studying arithmetic modulo a fixed integer n, is central to modern cryptography: the RSA encryption algorithm derives its security from the computational difficulty of factoring the product of two large prime numbers. Fermat's Last Theorem, stating that no three positive integers satisfy aⁿ + bⁿ = cⁿ for n greater than two, resisted proof for 358 years until Andrew Wiles succeeded in 1995.",
unknown:["factorisation","modular","infinitude"],
defs:["the decomposition of a number or expression into a product of factors; the unique prime factorisation of an integer","relating to a system of arithmetic where numbers wrap around after reaching a certain value","the state of being infinite in number; the fact of having no end"],
hints:["'Factorisation' in French — direct cognate from Latin 'factor' (maker, doer).","'Modulaire' in French — direct cognate from Latin 'modulus' (small measure).","'Infinité' in French — direct cognate from Latin 'infinitas' (boundlessness)."],
structure:"explanation"},

{id:"mat12",field:"mathematics",level:"C1",type:"abstract",title:"Measure Theory",
text:"Measure theory provides the rigorous mathematical foundation for integration, probability, and the study of geometric quantities. A measure assigns a non-negative real number to subsets of a space, generalising the intuitive notions of length, area, volume, and probability. The Lebesgue integral, constructed via measure theory, extends the Riemann integral to a vastly broader class of functions and is the standard tool of modern analysis. The Borel-Cantelli lemma and the law of large numbers are measure-theoretic results of central importance in probability theory, while measure-theoretic probability provides the rigorous underpinning for stochastic processes and financial mathematics.",
unknown:["rigorous","stochastic","underpinning"],
defs:["extremely thorough and precise, with careful attention to every detail; based on proof rather than intuition","randomly determined; having a probability distribution or pattern that may be statistically analysed"],
hints:["'Rigoureux' in French — direct cognate from Latin 'rigor' (stiffness, severity).","'Stochastique' in French — direct cognate from Greek 'stochastikos' (able to guess).","'Fondement' in French — direct cognate from Latin 'fundamentum'."],
structure:"explanation"},

{id:"mat13",field:"mathematics",level:"B1",type:"journalism",title:"The Maths of Voting",
text:"Arrow's impossibility theorem proves that no ranked voting system can simultaneously satisfy a small set of seemingly reasonable fairness criteria when there are three or more candidates. The criteria include unanimity — if everyone prefers A to B, then A should win — independence of irrelevant alternatives, and the absence of a dictator whose preferences always determine the outcome. This result, proved by economist Kenneth Arrow in 1951, has profound implications for democracy: every voting system must sacrifice at least one intuitive notion of fairness. Despite this, different systems may still be preferable in practice, and the theorem has spurred ongoing research into the mathematics of collective decision-making.",
unknown:["unanimity","irrelevant","implications"],
defs:["complete agreement among all members of a group","not connected with the subject being considered; not affecting the outcome","conclusions or consequences that follow from something, especially when not immediately obvious"],
hints:["'Unanimité' in French — direct cognate from Latin 'unanimitas' (oneness of mind).","'Non pertinent' in French — 'pertinent' shares Latin root 'pertinere' (to belong to).","'Implications' in French — identical word from Latin 'implicare' (to fold in)."],
structure:"claim-evidence"},

// ═══════════════════════════════════════════════════════════════
// CHEMISTRY — 13 texts
// ═══════════════════════════════════════════════════════════════
{id:"che01",field:"chemistry",level:"B1",type:"textbook",title:"Chemical Bonds",
text:"Chemical bonds hold atoms together in molecules and extended structures. Ionic bonds form when one atom transfers electrons to another, creating oppositely charged ions that attract each other — common in salts such as sodium chloride. Covalent bonds form when atoms share electrons, allowing each to achieve a stable electron configuration — this type of bonding occurs in most organic molecules. Metallic bonding involves a sea of delocalised electrons shared among all atoms in the metal lattice, explaining metals' conductivity and malleability. Bond strength, measured as bond dissociation energy, is a key determinant of a molecule's chemical reactivity.",
unknown:["ionic","covalent","delocalised"],
defs:["relating to ions; formed through the complete transfer of electrons creating charged particles","relating to a type of chemical bond where electrons are shared between atoms","spread over or occupying a wider area than expected; in chemistry, electrons not associated with any single atom but shared across a structure"],
hints:["'Ionique' in French — direct cognate from Greek 'ion' (going).","'Covalent' in French — identical term from Latin 'co-' (together) + 'valens' (being strong).","'Délocalisé' in French — direct cognate from Latin 'de-' (away from) + 'locus' (place)."],
structure:"compare-contrast"},

{id:"che02",field:"chemistry",level:"B1",type:"textbook",title:"Acids and Bases",
text:"Acids and bases are fundamental classes of chemical compounds with opposing properties. According to the Brønsted-Lowry definition, an acid is a proton donor and a base is a proton acceptor. The pH scale measures the acidity of a solution on a logarithmic scale from 0 to 14: values below 7 are acidic, 7 is neutral, and above 7 is basic (alkaline). Strong acids such as hydrochloric acid fully dissociate in water, releasing all their protons, while weak acids only partially dissociate. Buffers — solutions that resist changes in pH when small amounts of acid or base are added — are essential in biological systems to maintain stable pH conditions.",
unknown:["dissociate","logarithmic","alkaline"],
defs:["to break apart into ions when dissolved in water; to separate into component parts","relating to a scale in which each unit represents a tenfold change in the quantity being measured","relating to or having the properties of a base; having a pH greater than 7"],
hints:["'Dissocier' in French — direct cognate from Latin 'dissociare' (to separate).","'Logarithmique' in French — direct cognate; 'logarithme' comes from Greek 'logos' + 'arithmos' (number).","'Alcalin' in French — from Arabic 'al-qali' (the ashes), entered French before English."],
structure:"explanation"},

{id:"che03",field:"chemistry",level:"B2",type:"textbook",title:"Organic Chemistry Fundamentals",
text:"Organic chemistry is the study of carbon-containing compounds and their reactions. Carbon's unique ability to form four covalent bonds allows it to create chains, rings, and branched structures of extraordinary complexity. Functional groups — specific arrangements of atoms that confer characteristic chemical properties — are the fundamental building blocks of organic chemistry. Common functional groups include hydroxyl groups (alcohols), carboxyl groups (acids), amino groups (amines), and carbonyl groups (aldehydes and ketones). The systematic IUPAC nomenclature provides an unambiguous naming system for organic compounds based on the structure of the carbon skeleton.",
unknown:["functional groups","nomenclature","carbonyl"],
defs:["specific groups of atoms within a molecule that are responsible for characteristic chemical reactions","a system of names or terms, particularly the formal rules for naming chemical compounds","a chemical group consisting of a carbon atom double-bonded to an oxygen atom, found in aldehydes and ketones"],
hints:["'Groupes fonctionnels' in French — direct translation; 'fonctionnel' from Latin 'functio' (performance).","'Nomenclature' in French — identical word from Latin 'nomenclatura' (list of names).","'Carbonyle' in French — direct cognate from 'carbone' + '-yle' (a chemical suffix)."],
structure:"explanation"},

{id:"che04",field:"chemistry",level:"B2",type:"abstract",title:"Reaction Kinetics",
text:"Chemical kinetics studies the rates of chemical reactions and the factors that influence them. The rate of a reaction depends on the concentrations of reactants, temperature, and the presence of catalysts. The Arrhenius equation quantifies the exponential dependence of reaction rate on temperature, relating it to the activation energy — the minimum energy required for a reaction to proceed. Reaction mechanisms provide a step-by-step account of the elementary steps through which reactants transform into products; the slowest step in a mechanism, the rate-determining step, controls the overall reaction rate. Transition state theory describes the high-energy intermediate configuration through which reactants must pass.",
unknown:["Arrhenius","rate-determining","transition state"],
defs:["relating to the equation developed by Svante Arrhenius describing how reaction rates depend on temperature and activation energy","the slowest elementary step in a reaction mechanism, which controls the overall rate of the reaction","the highest-energy configuration that reacting molecules must achieve to proceed to products; a saddle point on the potential energy surface"],
hints:["'Arrhenius' — proper name (Swedish chemist); the equation 'loi d'Arrhenius' is the same in French.","'Étape limitante' in French — 'limiter' from Latin 'limitare' (to bound); same concept.","'État de transition' in French — direct translation; 'transition' from Latin 'transire' (to go across)."],
structure:"explanation"},

{id:"che05",field:"chemistry",level:"C1",type:"abstract",title:"Spectroscopy",
text:"Spectroscopy is the study of the interaction between matter and electromagnetic radiation, providing a window into the electronic, vibrational, and rotational states of molecules. Nuclear magnetic resonance (NMR) spectroscopy exploits the magnetic properties of certain atomic nuclei to provide information about the connectivity and environment of atoms within a molecule, making it indispensable for structure determination in organic and biological chemistry. Mass spectrometry measures the mass-to-charge ratio of ions, enabling the precise determination of molecular weights and structural fragmentation patterns. Infrared spectroscopy identifies functional groups through their characteristic absorption frequencies, while UV-visible spectroscopy probes electronic transitions.",
unknown:["vibrational","connectivity","fragmentation"],
defs:["relating to the oscillatory motion of atoms within a molecule about their equilibrium positions","the way in which parts of a system are joined or related to each other; the bonding arrangement within a molecule","the breaking apart of a molecule into smaller fragments, particularly as observed in mass spectrometry"],
hints:["'Vibrationnel' in French — direct cognate from Latin 'vibrare' (to shake, to vibrate).","'Connectivité' in French — direct cognate from Latin 'connectere' (to tie together).","'Fragmentation' in French — identical word from Latin 'fragmentum' (a broken piece)."],
structure:"explanation"},

{id:"che06",field:"chemistry",level:"B1",type:"journalism",title:"Green Chemistry",
text:"Green chemistry is a philosophy that aims to design chemical products and processes that minimise the use and generation of hazardous substances. The twelve principles of green chemistry, developed by Paul Anastas and John Warner in 1998, provide a framework for chemists to reduce waste, use renewable feedstocks, and design chemicals that degrade safely after use. One example is the development of biodegradable plastics made from plant-based materials rather than petroleum. The pharmaceutical industry has embraced green chemistry to reduce the enormous quantities of solvent waste generated during drug synthesis. Atom economy — measuring how much of the reactants end up in the final product — is a key green chemistry metric.",
unknown:["hazardous","feedstocks","biodegradable"],
defs:["involving potential risk of harm; dangerous, especially to health or the environment","raw materials used as the starting point in an industrial or chemical process","capable of being decomposed by bacteria or other living organisms; breaking down naturally in the environment"],
hints:["'Dangereux/Hasardeux' in French — 'hasardeux' from Arabic 'az-zahr' (dice), entered French before English.","'Matières premières' in French — different phrase but same concept of starting materials.","'Biodégradable' in French — identical word: 'bio' (life) + 'dégradable' (degradable)."],
structure:"explanation"},

{id:"che07",field:"chemistry",level:"B2",type:"textbook",title:"Electrochemistry",
text:"Electrochemistry studies the relationship between chemical reactions and electrical energy. In galvanic cells, spontaneous redox reactions generate electrical current: at the anode, oxidation releases electrons that flow through an external circuit to the cathode, where reduction occurs. The electromotive force — the voltage generated by the cell — is determined by the standard reduction potentials of the two half-reactions. Electrolytic cells reverse this process, using electrical energy to drive non-spontaneous chemical reactions, as in the electroplating of metals and the production of aluminium by the Hall-Héroult process. Fuel cells, which convert the chemical energy of hydrogen and oxygen directly to electricity, represent a promising clean energy technology.",
unknown:["galvanic","oxidation","electromotive"],
defs:["relating to a type of cell that uses a spontaneous chemical reaction to produce electrical energy, named after Luigi Galvani","a chemical process in which a substance loses electrons, increasing its oxidation state","relating to the force or voltage that drives current around an electrical circuit; the potential difference across a cell"],
hints:["'Galvanique' in French — identical word (from Italian physicist Galvani, adopted into both languages).","'Oxydation' in French — direct cognate from Greek 'oxys' (sharp, acid).","'Électromotrice' in French — 'force électromotrice (FEM)' — direct cognate."],
structure:"explanation"},

{id:"che08",field:"chemistry",level:"C1",type:"abstract",title:"Computational Chemistry",
text:"Computational chemistry employs mathematical methods and computer simulation to study chemical phenomena, supplementing and sometimes replacing experimental investigation. Ab initio methods, grounded in quantum mechanics, solve the Schrödinger equation approximately for molecular systems, providing accurate energies and geometries without empirical parameterisation. Density functional theory (DFT), the dominant method in contemporary computational chemistry, approximates the effects of electron correlation through exchange-correlation functionals, offering a computationally tractable alternative to more rigorous wavefunction methods. Molecular dynamics simulations propagate classical equations of motion for atomic systems, enabling the study of conformational changes, protein folding, and solvent effects on timescales accessible to modern hardware.",
unknown:["empirical","tractable","conformational"],
defs:["based on observation and experiment rather than theory; in parameterisation, using experimental data to fit model parameters","capable of being dealt with or solved; manageable in terms of computational resources"],
hints:["'Empirique' in French — direct cognate from Greek 'empeirikos' (experienced, based on observation).","'Traitable' in French — direct cognate from Latin 'tractabilis' (manageable).","'Conformationnel' in French — direct cognate from Latin 'conformare' (to give form to)."],
structure:"explanation"},

{id:"che09",field:"chemistry",level:"B1",type:"textbook",title:"States of Matter",
text:"Matter exists in four common states: solid, liquid, gas, and plasma. In solids, particles are arranged in a regular lattice and vibrate about fixed positions, giving solids a definite shape and volume. In liquids, particles are in contact but free to move past each other, giving liquids a definite volume but no fixed shape. In gases, particles are widely separated and move independently at high speeds, so gases have neither definite shape nor volume. Phase transitions — melting, boiling, sublimation, and their reverses — occur when energy changes overcome the intermolecular forces holding particles in their current state.",
unknown:["lattice","sublimation","intermolecular"],
defs:["a regular, repeating three-dimensional arrangement of particles in a crystalline solid","the direct transition of a substance from solid to gas without passing through the liquid phase","occurring between molecules; describing forces or interactions between separate molecules"],
hints:["'Réseau cristallin' in French — 'réseau' means network/lattice; 'crystallin' from Greek 'krystallos' (ice).","'Sublimation' in French — identical word from Latin 'sublimis' (elevated).","'Intermoléculaire' in French — direct compound: 'inter-' (between) + 'moléculaire'."],
structure:"compare-contrast"},

{id:"che10",field:"chemistry",level:"B2",type:"journalism",title:"Drug Development",
text:"Developing a new drug from initial discovery to patient use takes on average twelve years and costs over one billion dollars. The process begins with target identification — finding a biological molecule whose activity causes disease — followed by the screening of thousands of potential drug candidates for binding activity. Promising candidates undergo lead optimisation, modifying their chemical structure to improve potency, selectivity, and pharmacokinetic properties. Clinical trials then assess safety and efficacy in human volunteers across three phases, with phase three involving thousands of patients. The high failure rate — over 90% of drug candidates fail before reaching the market — reflects the extraordinary complexity of achieving therapeutic effect in the human body without unacceptable toxicity.",
unknown:["pharmacokinetic","efficacy","toxicity"],
defs:["relating to the movement of drugs through the body, including absorption, distribution, metabolism, and elimination","the ability of a drug to produce the desired therapeutic effect under controlled conditions","the quality of being toxic or poisonous; the degree to which a substance can damage an organism"],
hints:["'Pharmacocinétique' in French — direct compound cognate: 'pharmakon' (drug) + 'kinetikos' (of motion).","'Efficacité' in French — direct cognate from Latin 'efficacia' (effectiveness).","'Toxicité' in French — direct cognate from Greek 'toxikon' (poison for arrows)."],
structure:"explanation"},

{id:"che11",field:"chemistry",level:"C1",type:"abstract",title:"Polymer Chemistry",
text:"Polymers are macromolecules formed by the covalent linkage of large numbers of smaller repeat units called monomers. Addition polymerisation involves the sequential insertion of alkene monomers into a growing chain without loss of atoms, while condensation polymerisation produces a small molecule such as water at each step. The molecular weight distribution, quantified by the dispersity index, significantly influences the mechanical and rheological properties of the resulting material. Block copolymers — polymers in which distinct sequences of chemically different monomer units are covalently joined — exhibit microphase separation, generating ordered nanostructures with applications in lithography, drug delivery, and filtration membranes.",
unknown:["rheological","dispersity","microphase"],
defs:["relating to the flow and deformation of matter under applied stress; describing how materials behave when flowing","a measure of the heterogeneity of a polymer's molecular weight distribution; the ratio of weight-average to number-average molecular weight","separation occurring at the nanometre scale, where distinct chemical domains form ordered structures within a single material"],
hints:["'Rhéologique' in French — direct cognate from Greek 'rheos' (flow) + 'logos' (study).","'Dispersité' in French — direct cognate from Latin 'dispersus' (scattered).","'Microséparation de phases' in French — 'phase' is identical in both languages; 'séparation' from Latin 'separare'."],
structure:"explanation"},

{id:"che12",field:"chemistry",level:"B1",type:"textbook",title:"Chemical Equilibrium",
text:"Many chemical reactions are reversible — rather than going to completion, they reach a state of dynamic equilibrium in which both forward and reverse reactions occur at equal rates, resulting in constant concentrations of reactants and products. Le Chatelier's principle predicts how an equilibrium will shift in response to a disturbance: if a reaction is at equilibrium and the concentration of a reactant is increased, the system will shift toward producing more products to reduce the excess. Similarly, increasing temperature favours the endothermic direction. This principle allows chemists to optimise reaction conditions to maximise yield of desired products.",
unknown:["reversible","endothermic","equilibrium"],
defs:["able to proceed in both directions; capable of returning to its original state","absorbing heat from the surroundings during a chemical reaction; requiring energy input to proceed","the state of a system in which opposing forces or processes are balanced, resulting in no net change"],
hints:["'Réversible' in French — direct cognate from Latin 'reversibilis' (that can be turned back).","'Endothermique' in French — direct compound: 'endo-' (within) + 'thermique' (thermal).","'Équilibre' in French — direct cognate from Latin 'aequilibrium' (equal balance)."],
structure:"explanation"},

{id:"che13",field:"chemistry",level:"B2",type:"abstract",title:"Coordination Chemistry",
text:"Coordination compounds consist of a central metal ion surrounded by coordinating ligands — molecules or ions that donate electron pairs to the metal through coordinate covalent bonds. The number of ligand donor atoms directly bonded to the metal centre defines the coordination number. Crystal field theory explains the splitting of d-orbital energies in the electrostatic field of ligands, predicting the colour, magnetism, and reactivity of coordination complexes. Transition metal catalysts, which constitute the active sites of enzymes and the basis of industrial processes such as the Haber-Bosch synthesis of ammonia, derive their remarkable catalytic activity from the ability to adopt variable oxidation states and bind substrates in their coordination sphere.",
unknown:["ligands","coordination number","oxidation states"],
defs:["atoms, ions, or molecules that donate electron pairs to a central metal atom to form coordination compounds","the number of ligand atoms directly bonded to the central metal atom in a coordination compound","values representing the degree of oxidation of an atom; the hypothetical charge an atom would have if all bonds were completely ionic"],
hints:["'Ligands' in French — identical term from Latin 'ligare' (to bind).","'Nombre de coordination' in French — direct translation; 'coordination' from Latin 'coordinare' (to arrange together).","'Degrés d'oxydation' in French — 'oxydation' from Greek 'oxys' (acid, sharp)."],
structure:"explanation"},

// ═══════════════════════════════════════════════════════════════
// ENGINEERING — 14 texts
// ═══════════════════════════════════════════════════════════════
{id:"eng01",field:"engineering",level:"B1",type:"textbook",title:"Stress and Strain",
text:"When a force is applied to a material, it experiences stress — the internal force per unit area resisting the applied load. Strain is the resulting deformation, expressed as the change in length divided by the original length. For most materials within the elastic range, stress and strain are proportional — this relationship is known as Hooke's Law, and the constant of proportionality is the Young's modulus, a measure of stiffness. When stress exceeds the yield strength of a material, permanent deformation occurs. If stress continues to increase, the material eventually fractures at its ultimate tensile strength.",
unknown:["proportional","yield strength","tensile"],
defs:["having a constant ratio to another quantity; increasing or decreasing at the same rate","the stress at which a material begins to deform permanently, beyond the elastic range","relating to tension; tensile strength is the maximum stress a material can withstand while being stretched before breaking"],
hints:["'Proportionnel' in French — direct cognate from Latin 'proportionalis'.","'Limite élastique' in French — 'élastique' from Greek 'elastikos' (ductile).","'Traction/Tensile' in French — 'résistance à la traction'; 'traction' from Latin 'trahere' (to pull)."],
structure:"explanation"},

{id:"eng02",field:"engineering",level:"B1",type:"textbook",title:"Fluid Mechanics",
text:"Fluid mechanics studies the behaviour of liquids and gases under applied forces. For an incompressible fluid in steady flow, Bernoulli's equation expresses the conservation of energy: as fluid velocity increases, pressure decreases, and vice versa. This principle explains how aircraft wings generate lift — the curved upper surface causes air to move faster, reducing pressure above the wing relative to below. Viscosity measures a fluid's resistance to flow: water has low viscosity while honey has high viscosity. Reynolds number, a dimensionless quantity, predicts whether flow will be laminar and smooth or turbulent and chaotic.",
unknown:["incompressible","viscosity","laminar"],
defs:["not able to be reduced in volume by applied pressure; maintaining constant density","the property of a fluid that describes its resistance to flow or deformation under applied stress","relating to smooth, orderly fluid flow in parallel layers with no disruption between the layers"],
hints:["'Incompressible' in French — identical word from Latin 'in-' (not) + 'compressus' (squeezed).","'Viscosité' in French — direct cognate from Latin 'viscosus' (sticky).","'Laminaire' in French — direct cognate from Latin 'lamina' (thin layer)."],
structure:"explanation"},

{id:"eng03",field:"engineering",level:"B2",type:"textbook",title:"Control Systems",
text:"Control systems are mechanisms that regulate the behaviour of other systems to achieve a desired output. Feedback control uses measurements of the system output to continuously correct deviations from the desired setpoint — the thermostat in a building is a familiar example. Proportional-integral-derivative (PID) controllers, the most widely used feedback controllers in industry, compute a correction signal based on the current error, the accumulated past error, and the rate of change of error. Open-loop control, by contrast, applies corrections without measuring the actual output, making it simpler but vulnerable to disturbances. Stability — ensuring the system returns to equilibrium after a disturbance rather than oscillating uncontrollably — is the central concern in control system design.",
unknown:["setpoint","derivative","oscillating"],
defs:["the target value that a control system aims to maintain for a controlled variable","the rate of change of a quantity with respect to time; in PID control, used to anticipate future error based on current rate of change","varying or moving back and forth between two extremes in a regular rhythm"],
hints:["'Consigne/Point de réglage' in French — 'consigne' is the common French term for setpoint.","'Dérivée' in French — direct cognate from Latin 'derivare' (to draw off).","'Oscillant' in French — direct cognate from Latin 'oscillare' (to swing)."],
structure:"explanation"},

{id:"eng04",field:"engineering",level:"B2",type:"journalism",title:"Renewable Energy Systems",
text:"The global transition to renewable energy is accelerating as the costs of solar photovoltaic and wind power have fallen dramatically — in many regions, new renewable capacity is now cheaper than new fossil fuel plants. However, the intermittent nature of solar and wind energy creates challenges for grid stability: output depends on weather conditions and does not necessarily match demand patterns. Energy storage systems, particularly lithium-ion batteries and pumped hydroelectric storage, provide the buffering needed to balance supply and demand. Smart grid technologies, using sensors and algorithms to dynamically route power and manage distributed generation, are essential infrastructure for high-penetration renewable energy systems.",
unknown:["photovoltaic","intermittent","penetration"],
defs:["relating to the direct conversion of light into electricity using semiconductor devices","occurring at irregular intervals; not continuous or steady; starting and stopping unpredictably","in energy systems, the proportion of electricity supplied by a particular source relative to total demand"],
hints:["'Photovoltaïque' in French — identical compound term from Greek 'photos' (light) + Italian physicist Volta.","'Intermittent' in French — direct cognate from Latin 'intermittere' (to leave off for a time).","'Pénétration' in French — direct cognate from Latin 'penetrare' (to enter into)."],
structure:"problem-solution"},

{id:"eng05",field:"engineering",level:"C1",type:"abstract",title:"Finite Element Analysis",
text:"Finite element analysis (FEA) is a numerical method for solving partial differential equations governing physical phenomena in domains of complex geometry. The domain is discretised into a mesh of simple geometric elements — triangles, quadrilaterals, tetrahedra — within which the solution is approximated by polynomial functions. Assembly of element equations into a global system and application of boundary conditions yields a large sparse linear system solved by iterative methods. FEA is the workhorse of structural, thermal, electromagnetic, and fluid simulation in engineering design, enabling the virtual testing of components under operating conditions before physical prototypes are built.",
unknown:["discretised","sparse","iterative"],
defs:["divided into a finite number of discrete elements or nodes, replacing a continuous domain with a computational mesh","containing mostly zero values; a sparse matrix has few non-zero entries relative to its total size","involving repetition of a process with the goal of approaching a desired result, each cycle using the result of the previous one"],
hints:["'Discrétisé' in French — direct cognate from Latin 'discretus' (separated).","'Creux' in French — the technical term for a sparse matrix is 'matrice creuse' ('hollow matrix').","'Itératif' in French — direct cognate from Latin 'iterativus' (repeating)."],
structure:"explanation"},

{id:"eng06",field:"engineering",level:"B1",type:"journalism",title:"Bridge Engineering",
text:"Bridges must withstand not only the static weight of traffic and their own structure but also dynamic forces from wind, earthquakes, and the impact of heavy vehicles. Suspension bridges, like the Golden Gate, hang their deck from steel cables strung between tall towers, efficiently transferring loads to the anchorages. Arch bridges compress stone or concrete into a curved form that efficiently carries loads to the foundations. Cable-stayed bridges use cables running directly from towers to the deck, offering an economical solution for medium spans. The collapse of the Tacoma Narrows Bridge in 1940 revealed how aerodynamic resonance could destroy a bridge and transformed how engineers analyse wind-induced vibrations.",
unknown:["anchorages","aerodynamic","resonance"],
defs:["massive structures at each end of a suspension bridge that anchor the main cables under enormous tension","relating to the behaviour of objects moving through air and the forces air exerts on them","the amplification of vibrations that occurs when an object is subjected to forces at its natural frequency"],
hints:["'Ancrages' in French — direct cognate from Old Norse 'akkeri' (anchor), entered French as 'ancre'.","'Aérodynamique' in French — identical compound term.","'Résonance' in French — direct cognate from Latin 'resonare' (to resound)."],
structure:"explanation"},

{id:"eng07",field:"engineering",level:"B2",type:"textbook",title:"Thermodynamic Cycles",
text:"Heat engines convert thermal energy into mechanical work by operating a working fluid through a thermodynamic cycle. The Carnot cycle, a theoretical ideal, sets the maximum efficiency achievable between two temperature reservoirs — equal to one minus the ratio of cold to hot reservoir temperature. Real engines such as the Otto cycle used in petrol engines and the Rankine cycle used in steam power plants approximate this ideal while accounting for irreversibilities. Refrigerators and heat pumps operate the same cycles in reverse, using mechanical work to transfer heat from cold to hot reservoirs. The coefficient of performance measures how effectively a heat pump or refrigerator uses input work.",
unknown:["reservoir","irreversibilities","coefficient of performance"],
defs:["a body that can exchange thermal energy with a system; an ideal thermal reservoir maintains constant temperature regardless of heat added or removed","sources of entropy generation in real processes, including friction, heat transfer across temperature differences, and unrestrained expansion","a measure of the efficiency of a heat pump or refrigerator, expressed as the ratio of useful heat transferred to the work input required"],
hints:["'Réservoir' in French — identical word from Latin 'reservare' (to keep back).","'Irréversibilités' in French — direct cognate from Latin 'irreversibilis'.","'Coefficient de performance (COP)' in French — 'coefficient' is identical in both languages."],
structure:"explanation"},

{id:"eng08",field:"engineering",level:"C1",type:"abstract",title:"Fracture Mechanics",
text:"Fracture mechanics quantifies the conditions under which cracks propagate through materials, providing the theoretical basis for predicting failure in engineering structures. Linear elastic fracture mechanics introduces the stress intensity factor K, which characterises the stress field near a crack tip; fracture occurs when K exceeds the material's fracture toughness Kᴵᶜ. Fatigue fracture, caused by cyclic loading far below the ultimate tensile strength, accounts for the majority of engineering failures; the Paris law describes crack growth rate as a power law function of the stress intensity range. Damage tolerance design explicitly acknowledges the presence of defects and requires that structures sustain specified loads throughout their service life with inspectable crack sizes.",
unknown:["cyclic","fatigue","damage tolerance"],
defs:["occurring in repeated cycles; alternating between maximum and minimum values at regular intervals","the progressive and localised structural damage that occurs when a material is subjected to repeated loading and unloading","a design philosophy that accepts the inevitable presence of defects and specifies inspection intervals and loading limits to prevent catastrophic failure"],
hints:["'Cyclique' in French — direct cognate from Greek 'kyklos' (circle).","'Fatigue' in French — identical word from Latin 'fatigare' (to weary).","'Tolérance aux dommages' in French — 'tolérance' from Latin 'tolerantia'; 'dommage' from Latin 'damnum' (loss)."],
structure:"explanation"},

{id:"eng09",field:"engineering",level:"B2",type:"journalism",title:"Smart Materials",
text:"Smart materials are engineered materials that respond to external stimuli — temperature, stress, electric or magnetic fields, or light — with significant changes in their properties. Shape memory alloys such as nitinol return to a memorised shape when heated, enabling self-deploying spacecraft structures, bone implants that expand after insertion, and temperature-responsive actuators. Piezoelectric materials convert mechanical deformation into electrical signals and vice versa, powering sensors in smartphones, ultrasound transducers, and energy harvesters that capture vibrations from their environment. Magnetorheological fluids transform from liquid to near-solid states in milliseconds under applied magnetic fields, providing adaptive damping in automotive suspension systems.",
unknown:["stimuli","actuators","piezoelectric"],
defs:["changes in the environment that cause a physical or behavioural response in a system or organism","devices that convert an energy input — electrical, thermal, or hydraulic — into mechanical motion","relating to materials that generate an electric charge in response to mechanical stress, and deform when an electric field is applied"],
hints:["'Stimuli' in French — identical Latin plural (singular: stimulus).","'Actionneurs' in French — direct cognate from Latin 'actio' (action).","'Piézoélectrique' in French — identical compound from Greek 'piezein' (to press) + 'elektron'."],
structure:"explanation"},

{id:"eng10",field:"engineering",level:"B1",type:"textbook",title:"Electric Circuits",
text:"An electric circuit is a closed path through which current flows from a source of electrical energy to the components that use it. Ohm's law states that the current through a conductor is proportional to the voltage across it and inversely proportional to its resistance. In series circuits, components share the same current but the voltage is divided; in parallel circuits, components share the same voltage but the current divides. Kirchhoff's voltage law states that the sum of all voltages around any closed loop is zero; Kirchhoff's current law states that the sum of currents entering a junction equals the sum leaving it. These laws provide the foundation for analysing circuits of any complexity.",
unknown:["conductor","junction","Kirchhoff"],
defs:["a material that allows electric current to flow through it with relatively little resistance","a point in a circuit where three or more conductors meet","relating to Gustav Kirchhoff, the physicist whose laws describe current and voltage in electrical circuits"],
hints:["'Conducteur' in French — direct cognate from Latin 'conducere' (to lead together).","'Nœud' in French — the French term for a circuit junction (literally 'knot').","'Kirchhoff' — proper name; laws are 'lois de Kirchhoff' in French, identical."],
structure:"explanation"},

{id:"eng11",field:"engineering",level:"C1",type:"abstract",title:"Computational Fluid Dynamics",
text:"Computational fluid dynamics (CFD) solves the Navier-Stokes equations governing viscous fluid motion numerically, enabling the simulation of flow fields in geometrically complex domains. Turbulence modelling remains the central challenge: the Kolmogorov microscales at which turbulent energy dissipates require mesh resolutions computationally intractable for engineering applications, necessitating closure models that represent the effect of unresolved scales on resolved flow features. Reynolds-averaged Navier-Stokes (RANS) models, large eddy simulation (LES), and direct numerical simulation (DNS) occupy different positions in the accuracy-cost trade-off, with DNS restricted to low Reynolds number research flows. Validation against experimental data remains essential for establishing confidence in CFD predictions.",
unknown:["viscous","dissipates","closure models"],
defs:["having viscosity; relating to a fluid that resists flow due to internal friction between its layers","loses energy by converting it into another form, typically heat; in turbulence, kinetic energy converts to heat at small scales","mathematical approximations that represent the effect of small-scale turbulent motions on the larger-scale flow, allowing the equations to be closed and solved"],
hints:["'Visqueux' in French — direct cognate from Latin 'viscosus' (sticky).","'Se dissipe' in French — direct cognate from Latin 'dissipare' (to scatter).","'Modèles de fermeture' in French — 'fermeture' from Latin 'claudere' (to close); same concept."],
structure:"explanation"},

{id:"eng12",field:"engineering",level:"B2",type:"textbook",title:"Signal Processing",
text:"Signal processing involves the analysis, manipulation, and synthesis of signals — representations of information such as audio, images, or sensor measurements. The Fourier transform decomposes any signal into its constituent frequency components, revealing which frequencies are present and at what amplitudes. This frequency-domain representation is often more informative and easier to manipulate than the time-domain signal: filtering can be implemented by simply multiplying the Fourier transform by a filter function. Digital signal processing operates on discrete samples of a continuous signal; the Nyquist theorem specifies that the sampling rate must be at least twice the highest frequency present to avoid aliasing — the distortion caused by undersampling.",
unknown:["constituent","aliasing","synthesis"],
defs:["forming part of a whole; component parts that make up the complete thing","a distortion or artefact that occurs when a signal is sampled at too low a rate, causing different signals to become indistinguishable","the production or combination of something from parts or elements; in signal processing, creating a signal from its components"],
hints:["'Constituant' in French — direct cognate from Latin 'constituens' (establishing, composing).","'Repliement de spectre/Aliasage' in French — technical term; 'spectre' from Latin 'spectrum' (appearance).","'Synthèse' in French — direct cognate from Greek 'synthesis' (a putting together)."],
structure:"explanation"},

{id:"eng13",field:"engineering",level:"B1",type:"journalism",title:"3D Printing Revolution",
text:"Additive manufacturing — commonly called 3D printing — builds objects layer by layer from digital designs, enabling geometries that would be impossible or prohibitively expensive to produce by conventional machining. The technology has moved from prototyping novelty to production reality across aerospace, medicine, and consumer goods. In medicine, patient-specific implants and prosthetics can be designed from CT scan data and printed in titanium or biocompatible polymers. Aerospace companies use metal additive manufacturing to produce complex fuel injectors with internal channels that improve combustion efficiency. The ability to print spare parts on demand has begun to challenge conventional supply chains and inventory management.",
unknown:["additive","biocompatible","inventory"],
defs:["building up material layer by layer, as opposed to subtractive processes that cut away material","not harmful or toxic to living tissue; able to exist in contact with living systems without causing damage","a complete list of items in stock; in supply chain management, goods held by a company for use or sale"],
hints:["'Additif' in French — direct cognate from Latin 'addere' (to add to).","'Biocompatible' in French — identical compound: 'bio' (life) + 'compatible' (from Latin 'compatibilis').","'Inventaire' in French — direct cognate from Latin 'inventarium' (list of what is found)."],
structure:"explanation"},

{id:"eng14",field:"engineering",level:"B2",type:"abstract",title:"Reliability Engineering",
text:"Reliability engineering quantifies the probability that a system will perform its intended function under specified conditions for a defined period. The failure rate — the frequency with which a component fails — often follows the bathtub curve: high during early life due to manufacturing defects, low during normal operating life, and increasing during wear-out. Redundancy, incorporating parallel backup components, improves system reliability at the cost of weight, complexity, and expense. Mean time between failures (MTBF) and mean time to repair (MTTR) are fundamental metrics; their ratio determines system availability. Fault tree analysis and failure mode and effects analysis (FMEA) are systematic methods for identifying failure modes and their consequences.",
unknown:["redundancy","availability","fault tree"],
defs:["the inclusion of extra components or systems to ensure continued operation if the primary component fails","the proportion of time a system is in a functioning condition; mathematically, MTBF divided by the sum of MTBF and MTTR","a top-down graphical method for analysing the combinations of events or failures that could lead to an undesired system-level outcome"],
hints:["'Redondance' in French — direct cognate from Latin 'redundantia' (overflow).","'Disponibilité' in French — direct cognate from Latin 'disponere' (to arrange).","'Arbre de défaillance' in French — 'défaillance' from Latin 'defallere' (to fail)."],
structure:"explanation"},

// ═══════════════════════════════════════════════════════════════
// ARCHITECTURE & DESIGN — 15 texts
// ═══════════════════════════════════════════════════════════════
{id:"des01",field:"design",level:"B1",type:"textbook",title:"Principles of Design",
text:"Design principles are the fundamental guidelines that govern the arrangement of visual elements to create effective communication. Balance refers to the distribution of visual weight across a composition — symmetrical balance feels formal and stable, while asymmetrical balance feels dynamic and modern. Contrast creates visual interest and hierarchy by placing opposing elements together. Proximity groups related elements to show their relationship and creates organisation. Repetition creates unity and consistency across a design. Alignment connects elements visually even when they are not adjacent, creating order and structure. These principles work together to guide the viewer's eye and communicate hierarchy and meaning.",
unknown:["asymmetrical","hierarchy","proximity"],
defs:["not identical on both sides; lacking symmetry; creating visual tension through unequal distribution","a system of ranking things according to importance; in design, the visual organisation that indicates what to notice first","the quality of being near in space, time, or relationship; in design, grouping related elements to show connection"],
hints:["'Asymétrique' in French — direct cognate from Greek 'a-' (not) + 'symmetria' (proportion).","'Hiérarchie' in French — direct cognate from Greek 'hierarchia'.","'Proximité' in French — direct cognate from Latin 'proximitas' (nearness)."],
structure:"explanation"},

{id:"des02",field:"design",level:"B1",type:"journalism",title:"Sustainable Architecture",
text:"Sustainable architecture seeks to minimise the environmental impact of buildings throughout their entire lifecycle — from construction through operation to eventual demolition. Passive design strategies reduce energy demand through building orientation, insulation, natural ventilation, and daylight harvesting, reducing reliance on mechanical systems. The LEED and BREEAM rating systems provide standardised frameworks for assessing building sustainability across categories including energy use, water efficiency, materials, and indoor environmental quality. Living buildings, an emerging philosophy, aspire beyond sustainability to regenerativity — buildings that generate more energy and water than they consume and positively contribute to their local ecosystems.",
unknown:["passive design","regenerativity","orientation"],
defs:["building strategies that use the natural environment — sunlight, shade, wind, and thermal mass — to maintain comfort without mechanical systems","the quality of restoring and improving natural systems rather than merely sustaining them; going beyond zero impact to positive contribution","the positioning of a building on its site relative to the sun, wind, and topography to optimise natural light and thermal performance"],
hints:["'Conception passive' in French — 'passif' from Latin 'passivus' (capable of suffering/receiving).","'Régénérativité' in French — direct cognate from Latin 'regenerare' (to generate again).","'Orientation' in French — identical word from Latin 'orientem' (the rising sun, the East)."],
structure:"explanation"},

{id:"des03",field:"design",level:"B2",type:"textbook",title:"Structural Systems in Architecture",
text:"The structural system is the skeleton of a building, transferring loads from the roof and floors through walls, columns, and beams to the foundations and ultimately to the ground. Post-and-beam systems, among the oldest structural approaches, use vertical members (posts) to support horizontal members (beams) carrying loads in bending. The steel moment frame, in which beams and columns are rigidly connected, can resist lateral forces from wind and earthquakes without diagonal bracing. Shell structures distribute loads through curved surfaces in compression, enabling the thin concrete shells of Félix Candela and the sculptural forms of Zaha Hadid. Tensile structures carry loads purely in tension, eliminating bending stresses and allowing extremely lightweight construction.",
unknown:["lateral","bending","compression"],
defs:["relating to or directed toward the side; in structural engineering, horizontal forces from wind or seismic activity","deformation caused by loads applied transversely to a structural member; creates both tension and compression simultaneously","a pushing or squeezing force; the state of being compressed; opposite of tension"],
hints:["'Latéral' in French — direct cognate from Latin 'lateralis' (of a side).","'Flexion' in French — direct cognate from Latin 'flectere' (to bend).","'Compression' in French — direct cognate from Latin 'comprimere' (to press together)."],
structure:"explanation"},

{id:"des04",field:"design",level:"B2",type:"abstract",title:"User Experience Design",
text:"User experience (UX) design focuses on understanding users' needs, behaviours, and motivations to create products that are not merely functional but genuinely satisfying to use. The discipline draws on cognitive psychology, information architecture, and interaction design to reduce friction in user journeys. Usability heuristics — Jakob Nielsen's ten principles — provide a practical framework for identifying common interface problems, including poor error recovery, lack of system status feedback, and inconsistent design language. Human-centred design methods including personas, journey maps, and prototype testing embed real user feedback into the design process rather than treating usability as an afterthought.",
unknown:["heuristics","friction","personas"],
defs:["practical problem-solving approaches based on experience and common sense, used when a systematic analysis is not practical","in UX, any element of an experience that causes unnecessary difficulty, confusion, or effort for the user","fictional but evidence-based representations of a target user group, combining demographic data and behavioural patterns to guide design decisions"],
hints:["'Heuristiques' in French — direct cognate from Greek 'heuriskein' (to find, to discover).","'Friction' in French — identical word from Latin 'frictio' (rubbing).","'Personas' in French — identical term (from Latin 'persona', a theatrical mask)."],
structure:"explanation"},

{id:"des05",field:"design",level:"C1",type:"abstract",title:"Parametric Design",
text:"Parametric design is an approach in which the form of a design is governed by rules and mathematical relationships expressed as parameters, enabling systematic exploration of design possibilities through variation of these parameters. Algorithmic tools such as Grasshopper and Generative Components allow architects to define complex geometries through scripts, with each geometric outcome representing a point in a high-dimensional parameter space. Topology optimisation algorithms, inspired by bone growth and load path optimisation, iteratively remove material from regions of low stress, producing organic-looking structures that achieve remarkable stiffness-to-weight ratios. The integration of structural and environmental simulation directly within parametric workflows enables performance-driven design at the schematic stage.",
unknown:["parametric","topology optimisation","schematic"],
defs:["relating to or involving parameters; describing a design system where form is controlled by variable inputs","a computational process that determines the optimal distribution of material within a defined design space for given loads and boundary conditions, maximising structural efficiency","relating to the earliest stage of the design process, when overall form, organisation, and key relationships are established without detailed resolution"],
hints:["'Paramétrique' in French — direct cognate from Greek 'para' (beside) + 'metron' (measure).","'Optimisation topologique' in French — direct compound: 'topologie' from Greek 'topos' (place).","'Schématique' in French — direct cognate from Greek 'skhema' (form, figure)."],
structure:"explanation"},

{id:"des06",field:"design",level:"B1",type:"journalism",title:"The Bauhaus Legacy",
text:"The Bauhaus school, founded in Weimar, Germany in 1919 by Walter Gropius, was among the most influential educational experiments in the history of design. Its central conviction was that fine art and practical craft should not be separate disciplines: architects, painters, and craftspeople should collaborate to create objects that were both beautiful and functional. The Bauhaus curriculum integrated workshop training in materials and techniques with formal instruction in visual theory. When the Nazis forced the school to close in 1933, its emigrating faculty carried its ideas to the United States, where they profoundly shaped American design education and modernist architecture. The Bauhaus aesthetic — geometric forms, primary colours, and materials used honestly — remains pervasive in contemporary design.",
unknown:["pervasive","emigrating","curriculum"],
defs:["spreading widely through an area or group; present everywhere","leaving one's country to settle in another, typically to escape political or social conditions","the subjects and content that make up a course of study, particularly in an educational institution"],
hints:["'Omniprésent/Répandu' in French — 'omniprésent' from Latin 'omnis' (all) + 'praesens' (present).","'Émigrant' in French — direct cognate from Latin 'emigrare' (to move away from).","'Curriculum' in French — identical Latin word (a running course)."],
structure:"narrative"},

{id:"des07",field:"design",level:"B2",type:"textbook",title:"Colour Theory",
text:"Colour theory provides a systematic understanding of how colours interact and how they can be used effectively in design. The colour wheel, developed by Newton and refined by Itten, organises hues by their spectral relationships. Complementary colours — those directly opposite on the wheel — create maximum contrast when placed adjacent; analogous colours — those next to each other — create harmony. Colour has three dimensions: hue (the pure colour), saturation (its intensity or purity), and value (its lightness or darkness). Colour psychology examines how different hues affect human emotion and perception — findings extensively exploited in branding, interface design, and environmental colour planning.",
unknown:["spectral","analogous","saturation"],
defs:["relating to the spectrum of visible light; describing the distribution of wavelengths of electromagnetic radiation","similar or corresponding; in colour theory, colours adjacent to each other on the colour wheel that share a hue relationship","the intensity or purity of a colour; highly saturated colours are vivid, while desaturated colours appear grey"],
hints:["'Spectral' in French — direct cognate from Latin 'spectrum' (appearance, image).","'Analogue' in French — direct cognate from Greek 'analogos' (proportionate).","'Saturation' in French — identical word from Latin 'saturare' (to fill, to satisfy)."],
structure:"explanation"},

{id:"des08",field:"design",level:"C1",type:"abstract",title:"Phenomenology in Architecture",
text:"Phenomenological approaches to architecture, drawing principally on the philosophy of Merleau-Ponty and Heidegger, emphasise the lived bodily experience of space rather than its purely visual or geometric properties. Juhani Pallasmaa's 'The Eyes of the Skin' argues that modernist architecture's ocularcentrism — its privileging of the visual over all other senses — has produced alienating environments that fail to engage the full sensory richness of embodied human existence. By attending to acoustics, thermal conditions, material texture, the smell of spaces, and the proprioceptive experience of movement through them, architects can design environments that resonate deeply with human experience. This perspective has influenced the work of Peter Zumthor, whose Therme Vals and Bruder Klaus Field Chapel are often cited as paradigmatic examples.",
unknown:["ocularcentrism","proprioceptive","alienating"],
defs:["the privileging of vision over all other senses as the primary means of perceiving and understanding the world","relating to the sense that allows us to perceive the position and movement of our own body without using vision or touch","causing a feeling of isolation, estrangement, or disconnection from one's environment or social context"],
hints:["'Oculocentrisme' in French — compound from Latin 'oculus' (eye) + 'centrum' (centre).","'Proprioceptif' in French — from Latin 'proprius' (one's own) + 'recipere' (to receive).","'Aliénant' in French — direct cognate from Latin 'alienare' (to estrange, to make foreign)."],
structure:"claim-evidence"},

{id:"des09",field:"design",level:"B1",type:"textbook",title:"Typography",
text:"Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing. The selection of typeface — the design of a complete set of characters — establishes the tone and personality of a design. Serif typefaces, with their small finishing strokes, convey tradition and authority; sans-serif typefaces feel modern and neutral. Hierarchy is created through variation in size, weight, and spacing. The space between characters (tracking), between pairs of characters (kerning), and between lines (leading) profoundly affects readability. The measure — the width of a text column — is optimally between 45 and 75 characters per line for comfortable reading.",
unknown:["legible","serif","tracking"],
defs:["clear enough to read; describing text that can be decoded accurately, character by character","a small decorative stroke or foot added to the end of the main stroke of a letter in certain typefaces","the uniform adjustment of spacing between all characters in a block of text; also called letter-spacing"],
hints:["'Lisible' in French — direct cognate from Latin 'legibilis' (that can be read).","'Empattement' in French — the French term for serif (literally 'foot').","'Interlettrage/Tracking' in French — 'lettrage' from Latin 'littera' (letter)."],
structure:"explanation"},

{id:"des10",field:"design",level:"B2",type:"journalism",title:"Biophilic Design",
text:"Biophilic design is the practice of incorporating natural elements and patterns into the built environment to support human wellbeing, drawing on the evolutionary hypothesis that humans have an innate affinity for living systems. Research consistently shows that access to natural light, views of nature, plants, and natural materials reduces stress, improves cognitive performance, and accelerates recovery in healthcare settings. Beyond simple planting, biophilic design encompasses natural analogues — organic forms, natural textures, and patterns that evoke nature without being literally natural — and nature of the space patterns such as prospect, refuge, mystery, and risk that define compelling natural environments.",
unknown:["innate","analogues","prospect"],
defs:["inborn; present from birth; not learned or acquired through experience","things that are similar to or represent something else; in biophilic design, features that imply natural qualities without being literally natural","a wide view or vista; in biophilic design, spaces that offer an open view of the surroundings, satisfying the evolutionary drive to survey territory"],
hints:["'Inné' in French — direct cognate from Latin 'innatus' (born within).","'Analogues' in French — direct cognate from Greek 'analogos'.","'Vue panoramique/Prospect' in French — 'prospect' from Latin 'prospectus' (a view forward)."],
structure:"explanation"},

{id:"des11",field:"design",level:"B2",type:"abstract",title:"Design Thinking",
text:"Design thinking is a human-centred approach to innovation that draws on the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success. Developed and popularised by IDEO and Stanford's d.school, the process unfolds through five non-linear stages: empathise, define, ideate, prototype, and test. The empathise stage involves deep ethnographic immersion in the user's world; the define stage synthesises insights into a problem statement; ideation generates a large quantity of potential solutions without evaluation; prototyping makes ideas tangible; and testing with real users generates feedback to refine or redirect the design. The approach values rapid iteration and embraces failure as a learning tool.",
unknown:["ethnographic","synthesises","iteration"],
defs:["relating to the systematic study of people and cultures through immersive observation and participation","combines separate elements into a coherent whole; integrates diverse information into a unified understanding","the process of repeating a sequence of operations with the aim of approaching a desired result; each cycle is one iteration"],
hints:["'Ethnographique' in French — direct cognate from Greek 'ethnos' (people) + 'graphein' (to write).","'Synthétise' in French — direct cognate from Greek 'synthesis' (a putting together).","'Itération' in French — direct cognate from Latin 'iteratio' (a repetition)."],
structure:"explanation"},

{id:"des12",field:"design",level:"C1",type:"abstract",title:"Semiotics in Visual Communication",
text:"Semiotics — the study of signs and their meanings — provides a rigorous framework for analysing visual communication. Ferdinand de Saussure distinguished the signifier (the form a sign takes) from the signified (the concept it represents), while Charles Peirce categorised signs as iconic (resembling what they represent), indexical (causally connected to what they represent), or symbolic (related only by convention). Roland Barthes extended semiotic analysis to advertising and mass media, revealing how mythologies — second-order significations that naturalise cultural conventions — operate in visual culture. Understanding semiotics enables designers to communicate more precisely and to deconstruct the ideological assumptions embedded in visual representations.",
unknown:["signifier","indexical","mythologies"],
defs:["in semiotics, the form or medium through which a sign is expressed — the sound of a word, the shape of an image","relating to signs that are directly caused by or physically connected to what they represent, such as smoke indicating fire","in Barthes' semiotic theory, second-order signs where cultural values and ideological assumptions are presented as natural or self-evident"],
hints:["'Signifiant' in French — identical French term coined by Saussure himself, a French-speaking Swiss linguist.","'Indiciel' in French — from Latin 'indicium' (sign, indication).","'Mythologies' in French — identical word; Barthes' original text was written in French."],
structure:"explanation"},

{id:"des13",field:"design",level:"B1",type:"journalism",title:"Universal Design",
text:"Universal design is the principle that environments, products, and communication should be designed to be usable by all people, to the greatest extent possible, without adaptation or specialised design. The seven principles of universal design, developed at North Carolina State University in 1997, include equitable use, flexibility in use, simple and intuitive operation, perceptible information, tolerance for error, low physical effort, and appropriate size and space for approach and use. Beyond compliance with disability access legislation, universal design recognises that inclusive solutions often benefit everyone: the dropped kerb designed for wheelchair users is equally valuable for parents with prams, delivery workers, and elderly pedestrians.",
unknown:["equitable","intuitive","compliance"],
defs:["fair and impartial; providing everyone with equal opportunities and treating everyone according to their needs","easy to use and understand, especially without explicit instruction; based on immediate natural understanding","the action of obeying a rule, law, or regulation"],
hints:["'Équitable' in French — direct cognate from Latin 'aequitas' (equality, fairness).","'Intuitif' in French — direct cognate from Latin 'intuitio' (a looking at).","'Conformité' in French — from Latin 'conformitas' (likeness); similar root to 'compliance'."],
structure:"explanation"},

{id:"des14",field:"design",level:"B2",type:"textbook",title:"Acoustics in Architecture",
text:"Architectural acoustics addresses how sound behaves in enclosed spaces and how building design can optimise acoustic conditions for intended activities. Reverberation time — the duration for sound to decay by 60 decibels after the source stops — is the primary acoustic parameter: long reverberation suits symphonic music, short reverberation aids speech intelligibility. Sound absorption materials reduce reverberation by converting acoustic energy to heat; sound diffusion scatters reflections to create a sense of envelopment and spatial impression. Background noise levels must be controlled through structural isolation of vibrating equipment, floating floors, and careful ventilation duct design to avoid masking speech or music.",
unknown:["reverberation","diffusion","masking"],
defs:["the persistence of sound in an enclosed space after the original source has stopped, caused by repeated reflections from surfaces","the scattering of sound in multiple directions from a surface, creating a more even distribution of sound energy","in acoustics, the reduction in the ability to hear or detect one sound due to the presence of another, typically louder, sound"],
hints:["'Réverbération' in French — direct cognate from Latin 'reverberare' (to strike back).","'Diffusion' in French — identical word from Latin 'diffusio' (a spreading out).","'Masquage' in French — from 'masque' (mask); same metaphor of one sound hiding another."],
structure:"explanation"},

{id:"des15",field:"design",level:"C1",type:"abstract",title:"Metabolism in Architecture",
text:"Metabolism was a Japanese architectural movement of the 1960s that proposed a vision of cities as dynamic, living organisms capable of growth, change, and renewal. Metabolist architects including Kenzo Tange, Kisho Kurokawa, and Fumihiko Maki designed megastructures — large permanent infrastructure cores to which modular, replaceable capsule-units could be attached and detached as needed. The Nakagin Capsule Tower in Tokyo (1972), each of whose 140 individual capsules was intended to be replaceable, remains the most complete physical realisation of Metabolist ideas, though the replacement programme was never executed. Metabolism anticipated contemporary discussions around adaptive reuse, design for disassembly, and the circular economy in the built environment.",
unknown:["megastructures","modular","disassembly"],
defs:["large-scale architectural or urban structures intended to provide permanent infrastructure to which smaller components can be attached","designed in standardised units that can be combined or interchanged flexibly; relating to systems built from independent, interchangeable units","the process of taking apart a structure or product into its component parts, particularly to enable reuse or recycling of materials"],
hints:["'Mégastructures' in French — direct compound: 'méga' (large) + 'structure' (from Latin 'structura').","'Modulaire' in French — direct cognate from Latin 'modulus' (small measure).","'Démontage' in French — from 'démonter' (to take apart); 'disassembly' and 'démontage' share the same concept."],
structure:"explanation"},

];

export const getTextsByField = (field) =>
  TEXTS.filter(t => t.field === field);

export const getTextsByFieldAndLevel = (field, level) =>
  TEXTS.filter(t => t.field === field && t.level === level);

export const getRandomText = (field, excludeIds = []) => {
  const available = TEXTS.filter(t => t.field === field && !excludeIds.includes(t.id));
  if (available.length === 0) return TEXTS.find(t => t.field === field);
  return available[Math.floor(Math.random() * available.length)];
};

export const getTextForSession = (field, seenIds = [], sessionCount = 0) => {
  // Level progression: B1 for sessions 1-5, B2 for 6-12, C1 for 13+
  const targetLevel = sessionCount < 6 ? "B1" : sessionCount < 13 ? "B2" : "C1";
  const levelTexts = TEXTS.filter(t => t.field === field && t.level === targetLevel && !seenIds.includes(t.id));
  if (levelTexts.length > 0) {
    return levelTexts[Math.floor(Math.random() * levelTexts.length)];
  }
  // Fall back to any unseen text in the field
  const anyUnseen = TEXTS.filter(t => t.field === field && !seenIds.includes(t.id));
  if (anyUnseen.length > 0) {
    return anyUnseen[Math.floor(Math.random() * anyUnseen.length)];
  }
  // All seen — reset and start over at next level
  return TEXTS.filter(t => t.field === field)[Math.floor(Math.random() * TEXTS.filter(t => t.field === field).length)];
};

export const FIELD_DISPLAY = {
  biology: "Biology",
  physics: "Physics",
  cs: "Computer Science",
  mathematics: "Mathematics",
  chemistry: "Chemistry",
  engineering: "Engineering",
  design: "Architecture & Design",
};

export const FIELD_MAP = {
  "Biology": "biology",
  "Physics": "physics",
  "Computer Science": "cs",
  "Mathematics": "mathematics",
  "Chemistry": "chemistry",
  "Engineering": "engineering",
  "Architecture & Design": "design",
  "Other STEM": "biology",
};
