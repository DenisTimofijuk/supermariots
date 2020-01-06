import Entity from "./entity";
import { SoundEffects } from "./loaders/audio_loader";
export declare type Mario = 'idle' | 'run-1' | 'run-2' | 'run-3' | 'break' | 'jump' | 'run' | 'dead';
export declare type Goomba = 'walk-1' | 'walk-2' | 'flat' | 'walk';
export declare type Koopa = 'walk-1' | 'walk-2' | 'hiding' | 'hidding-with-legs' | 'wake' | 'walk';
export declare type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
export declare type Pipe = 'pipe-insert-vert-left' | 'pipe-insert-vert-right' | 'pipe-vert-left' | 'pipe-vert-right';
export declare type Cloud = 'cloud-1-1' | 'cloud-1-2' | 'cloud-1-3' | 'cloud-2-1' | 'cloud-2-2' | 'cloud-2-3';
export declare type EntityFactoriesName = 'mario' | 'goomba' | 'koopa';
export declare type json_File_Names = '1-1' | 'overworld' | 'Mario' | 'goomba' | 'koopa';
export declare type TileType = 'ground';
export declare type Pattern = 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'pipe-2h' | Pipe | 'cloud-single';
export declare type Trait_NAME = 'jump' | 'move' | 'velocity' | 'go' | 'walk' | 'pendulumMove' | 'behaviour' | 'stomper' | 'killable' | 'playerKontroller' | 'solid' | 'physics' | 'saundeffects';
export declare type FontName = string;
export declare type SpriteSheetNames = TileName | Mario | Pipe | Cloud | Goomba | Koopa | FontName;
export declare type Anim = (distance: number) => SpriteSheetNames;
export declare type EntityFunction = (audios: SoundEffects) => Entity;
export declare type EntityFactories = {
    [key in EntityFactoriesName]: EntityFunction;
};
export declare type Tiles = {
    tiles: Array<Tile_Element>;
};
export declare type Pattern_Element = {
    [K in Pattern]: Tiles;
};
export declare type Rng = [number, number, number, number] | [number, number, number] | [number, number];
export interface Tile_Element {
    name?: SpriteSheetNames;
    pattern?: Pattern;
    type?: TileType;
    ranges: Array<Rng>;
}
export declare type Layer = {
    tiles: Array<Tile_Element>;
};
export declare type Level_Entity = {
    name: EntityFactoriesName;
    pos: [number, number];
};
export interface level_1_1 {
    spriteSheet: json_File_Names;
    layers: Array<Layer>;
    patterns: Pattern_Element;
    entities: Array<Level_Entity>;
}
export declare type Tile_Overworld = {
    name: TileName;
    type: TileType;
    index: [number, number];
};
export declare type AnimationElement = {
    name: TileName | Mario;
    frameLen: number;
    frames: Array<TileName>;
};
export interface Overworld {
    imageURL: string;
    tileW: number;
    tileH: number;
    tiles: Array<Tile_Overworld>;
    animations: Array<AnimationElement>;
}
export interface MarioJSON {
    imageURL: string;
    frames: Array<{
        name: Mario;
        rect: [number, number, number, number];
    }>;
    animations: Array<AnimationElement>;
}
declare type KoopaAnimationElement = {
    name: Koopa;
    frameLen: number;
    frames: Array<Koopa>;
};
export interface KoopaJSON {
    imageURL: string;
    frames: Array<{
        name: Koopa;
        rect: [number, number, number, number];
    }>;
    animations: Array<KoopaAnimationElement>;
}
export interface MatrixValue {
    name?: SpriteSheetNames;
    type?: SpriteSheetNames;
}
export interface GetByIndex {
    tile: MatrixValue;
    y1: number;
    y2: number;
    x1: number;
    x2: number;
}
export {};
