interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}

//Object that can be moved in Mover class
interface Movable {
    x: number;
    y: number;

    xDirection: number;
    yDirection: number;

    top: number;
    bottom: number;
    left: number;
    right: number;

    isMoving: boolean;

    setX: (x: number) => void;
    setY: (y: number) => void;
    setIsMoving: (m: boolean) => void;
    draw: () => void;
}

//Object that can be hit by Movable in Mover calss
interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
}

//Line of Obstacle which can be on the way of Movable
interface ObstacleSurfaces {
    tl: Line,
    bl: Line,
    ll: Line,
    rl: Line,
    reference: Obstacle
}

interface Line {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}

interface MoveInfo {
    xDirection: number;
    yDirection: number;
    isMoving: boolean;
}

interface PlaygroundSize {
    width: number;
    height: number;
}