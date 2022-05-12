import { Mesh } from "three";

export interface CustomSphere extends Mesh {
    moveUpward?: boolean;
    increaseYSpeed?: boolean;
}