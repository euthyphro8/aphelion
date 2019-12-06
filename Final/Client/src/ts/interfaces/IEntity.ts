
enum EntityConstants {
    shieldTime = 600,
    rechargeTime = 500,
    size = 50,
    speed = 13
}
export { EntityConstants };

interface IEntity {
    name: string;
    x: number;
    y: number;
    shieldTime: number;
    rechargeTime: number;
    blockedThisShield: boolean;
}

export default IEntity;