import Player from '@/ts/graphics/game/Player'
import Client from '@/ts/coms/Client'
import IEntity from '@/ts/interfaces/IEntity'
import Renderer from '@/ts/graphics/game/Renderer'
import IHazard from '@/ts/interfaces/IHazard'
import IUserInfo from '@/ts/interfaces/IUserInfo'
import { EventEmitter } from 'events'

class Game extends EventEmitter {
    private context: CanvasRenderingContext2D
    private entities: Map<string, IEntity>
    private client: Client
    private player: Player
    private hazard: IHazard
    private score: number
    private roomId: string
    private status: string

    private requestId: number
    private accumTime: number
    private lastTime: number
    private stepTime: number

    constructor(
        ctx: CanvasRenderingContext2D,
        client: Client,
        user: IUserInfo
    ) {
        super()
        this.context = ctx
        this.client = client
        this.player = new Player(user.username)
        this.entities = new Map<string, IEntity>()
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70,
        }

        this.requestId = -1
        this.lastTime = 0.0
        this.accumTime = 0.0
        this.stepTime = 1000.0 / 60.0
        this.score = 0
        this.roomId = '-'
        this.status = ''
    }

    public start(): void {
        this.context.canvas.width = 1920
        this.context.canvas.height = 1080
        this.registerEvents()
    }

    public close() {
        this.unRegisterEvents()
    }

    private registerEvents(): void {
        this.player.registerEvents()
        this.requestId = requestAnimationFrame(this.tick.bind(this))
        this.client
            .subscribeToRoom(
                this.onServerTick.bind(this),
                this.onClientDied.bind(this)
            )
            .then((roomId) => {
                this.roomId = roomId
            })
    }

    private unRegisterEvents(): void {
        this.client.unSubscribeToRoom(
            this.player.entity.name,
            Math.floor(this.score),
            this.onServerTick.bind(this),
            this.onClientDied.bind(this)
        )
        cancelAnimationFrame(this.requestId)
        this.player.unRegisterEvents()
    }

    private onServerTick(hazard: IHazard, entities: [string, IEntity][]): void {
        this.entities = new Map<string, IEntity>(entities)
        this.hazard = hazard
        this.score += 1 / 30
    }

    private onClientDied(username: string): void {
        if (username === this.player.entity.name) {
            this.emit('close')
        } else {
            this.status = `Player ${username} died!`
        }
    }

    private tick(time: number) {
        let delta = time - this.lastTime
        this.lastTime = time
        // Update if the target time has elapsed
        this.accumTime += delta
        if (this.accumTime > this.stepTime) {
            while (this.accumTime > this.stepTime) {
                this.update(this.stepTime)
                this.accumTime -= this.stepTime
            }
            this.client.sendClientTick(this.player.entity)
        }
        // Render always
        this.render()
        this.requestId = requestAnimationFrame(this.tick.bind(this))
    }

    private update(dt: number): void {
        this.player.update(dt)
    }

    private render(): void {
        this.context.clearRect(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height
        )

        // Draw all bodies
        this.context.beginPath()
        this.entities.forEach((entity, id) =>
            Renderer.render(this.context, entity)
        )
        this.context.fill()

        // Draw all Shields
        this.context.beginPath()
        this.entities.forEach((entity, id) =>
            Renderer.renderShield(this.context, entity)
        )
        this.context.fill()

        // Draw all Recharges
        this.context.beginPath()
        this.entities.forEach((entity, id) =>
            Renderer.renderRecharge(this.context, entity)
        )
        this.context.stroke()

        // Draw all Recharges
        this.context.beginPath()
        Renderer.renderHazard(this.context, this.hazard)
        this.context.fill()

        // Draw all Usernames
        this.entities.forEach((entity, id) =>
            Renderer.renderName(this.context, entity)
        )

        Renderer.renderInfo(
            this.context,
            this.roomId,
            Math.floor(this.score),
            this.status
        )
    }
}

export default Game
