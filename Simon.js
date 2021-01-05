//Sounds
const sound_do = document.getElementById('sound_do')
const sound_re = document.getElementById('sound_re')
const sound_mi = document.getElementById('sound_mi')
const sound_fa = document.getElementById('sound_fa')
const sound_aplausos = document.getElementById('sound_aplausos')
const sound_perdiste = document.getElementById('sound_perdiste')

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

const btnEmpezar = document.getElementById('btnEmpezar')

const score = document.getElementById('level')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {

        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)


    }

    inicializar() {
        sound_aplausos.pause()
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.sounds = {
            sound_do,
            sound_re,
            sound_mi,
            sound_fa,

        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')

        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        this.aumentarScore()

    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'

        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3

        }
    }

    playSound(color) {
        switch (color) {
            case 'celeste':
                this.sounds.sound_do.play()
                break
            case 'violeta':
                this.sounds.sound_re.play()
                break
            case 'naranja':
                this.sounds.sound_mi.play()
                break
            case 'verde':
                this.sounds.sound_fa.play()
                break

        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.playSound(color), 500 * i)
            setTimeout(() => this.iluminarColor(color), 500 * i)
        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 250)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)

    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        this.playSound(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }


    }
    ganoElJuego() {
        sound_aplausos.play()
        swal('Fin del juego', 'Ganaste!', 'success')
            .then(this.inicializar.bind(this))
    }
    perdioElJuego() {
        sound_perdiste.play()
        swal('Fin del juego', 'Perdiste!', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })

    }

    aumentarScore(){
        score.innerHTML = `Nivel: ${this.nivel}`
    }
}
function empezarJuego() {
    window.juego = new Juego()
}