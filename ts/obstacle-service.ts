class ObstacleService {

    //Reformat bostacles into collection of lines with id
    public static getAllSurfaces(obstacles: Obstacle[]): ObstacleSurfaces[] {
        return obstacles
            .map(obstacle => {
                if (obstacle) {
                    return {
                        bl: {
                            x1: obstacle.x,
                            x2: obstacle.x + obstacle.width,
                            y1: obstacle.y + obstacle.height,
                            y2: obstacle.y + obstacle.height
                        },
                        tl: {
                            x1: obstacle.x,
                            x2: obstacle.x + obstacle.width,
                            y1: obstacle.y,
                            y2: obstacle.y
                        },
                        ll: {
                            x1: obstacle.x,
                            x2: obstacle.x,
                            y1: obstacle.y + obstacle.height,
                            y2: obstacle.y
                        },
                        rl: {
                            x1: obstacle.x + obstacle.width,
                            x2: obstacle.x + obstacle.width,
                            y1: obstacle.y,
                            y2: obstacle.y + obstacle.height
                        },
                        reference: obstacle
                    };
                }
            })
            .filter(o => o !== undefined);
    }
}