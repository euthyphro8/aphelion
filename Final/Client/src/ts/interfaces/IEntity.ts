
enum EntityConstants {
    shieldTime = 500,
    rechargeTime = 500,
    size = 50,
    speed = 10
}
export { EntityConstants };

interface IEntity {
    name: string;
    x: number;
    y: number;
    shieldTime: number;
    rechargeTime: number;
}

export default IEntity;