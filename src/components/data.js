// ══════════════════════════════════════════════════
//   DATOS DE LA EXPERIENCIA
//   Edita aquí tu letra y tu carta ✿
// ══════════════════════════════════════════════════

// Total de fotos (deben llamarse 1.png, 2.png ... hasta este número)
const TOTAL_PHOTOS = 18;

// Velocidad de escritura de la carta (ms por caracter)
const TYPING_SPEED = 30;

// Texto de la carta (se va escribiendo automáticamente)
const LETTER_TEXT = `Mi niña hermosa no sé ni cómo empezar esta carta porque siento que ninguna palabra alcanza para decirte todo lo que significas para mí, gracias por llegar a mi vida y cambiarla de una forma tan bonita. contigo aprendí lo que realmente es amar a alguien de verdad, sentir apoyo, cariño y felicidad con solo tenerte a mi lado.

Gracias por estar conmigo en mis momentos buenos y también en los malos, por escucharme, entenderme y nunca dejarme solo cuando más te necesito a veces no me doy cuenta de todo lo que haces por mí hasta que me pongo a pensar en cómo era mi vida antes de conocerte y desde que llegaste todo se siente diferente, más boniton me siento mas completo.

Admiro muchísimo la persona que eres mi vida, tienes un corazón demasiado lindo, eres una mujer increíble y nunca quiero que dudes de eso, me encanta tu forma de ser, tu manera de tratarme, cómo te preocupas por mí y cómo haces que incluso los días difíciles sean más fáciles.

Quiero que sepas que te amo demasiado, más de lo que a veces puedo expresar y aunque no siempre encuentre las palabras perfectas, cada abrazo, cada mensaje y cada momento contigo expresan todo mi amor que siento por ti.

Espero de verdad poder pasar muchísimos años a tu lado, seguir creciendo contigo, seguir creando recuerdos y acompañándonos en todo

Gracias por existir, por elegir quedarte conmigo y por hacerme sentir amado de una forma tan real.
te amo muchísimo culito 
`;

// ══════════════════════════════════════════════════
//   SECUENCIA: letra + duración individual
//
//   Cada entrada tiene:
//     text  → línea de letra que aparece
//     lyric → cuántos ms se queda visible esa línea
//     photo → cuántos ms dura la foto de ese momento
//
//   Si no pones "photo", usa el mismo valor que "lyric".
// ══════════════════════════════════════════════════
const SEQUENCE = [
  { text: "Tú no eres real, tú caíste del cielo",          lyric: 2100, photo: 2100 },
  { text: "Pa' mí sale el sol siempre que te veo",          lyric: 1000, photo: 1000 },
  { text: "Vamos a encerrarnos, mis planes cancelo",        lyric: 1000, photo: 1000 },
  { text: "Que estoy pa' driftear por tu cuerpo entero",    lyric:  900, photo:  900 },
  { text: "Te llevo pa' casa, te presento a abuelo",        lyric: 1000, photo: 1000 },
  { text: "Pa que te haga jugo, que ya hablé primero",      lyric:  800, photo:  800 },
  { text: "Estar sin tus besos, eso sí da miedo",           lyric:  700, photo:  700 },
  { text: "Tus ojitos lindos, mami, siempre quiero",        lyric:  600, photo:  600 },
  { text: "Quiero, quiero, quiero, quiero, quiero, quiero", lyric: 1400, photo: 1400 },
  { text: "Sí, eso es lo que quiero",                       lyric:  300, photo:  300 },
  { text: "quiero, quiero, quiero, quiero, quiero",         lyric: 1500, photo: 1500 },
  { text: "Ah, sabes que es verdad",                        lyric:  500, photo:  500 },
  { text: "Ponte de ladito, quédate sin na'",               lyric:  900, photo:  900 },
  { text: "Dile a toditos que ese es mi lunar",             lyric: 1000, photo: 1000 },
  { text: "Y es que en tus labios es que yo quiero estar",  lyric: 1000, photo: 1000 },
  { text: "Ese es mi lugar",                                lyric:  900, photo:  900 },
];
