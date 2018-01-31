interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}

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

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    num: number;
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