import Entity from "./entity";
import { SoundEffects } from "./loaders/audio_loader";

export type Mario = 'idle' | 'run-1' | 'run-2' | 'run-3' | 'break' | 'jump' | 'run' | 'dead';
export type Goomba = 'walk-1' | 'walk-2' | 'flat' | 'walk';
export type Koopa = 'walk-1' | 'walk-2' | 'hiding' | 'hidding-with-legs' | 'wake' | 'walk'
export type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
export type Pipe = 'pipe-insert-vert-left' | 'pipe-insert-vert-right' | 'pipe-vert-left' | 'pipe-vert-right';
export type Cloud = 'cloud-1-1' | 'cloud-1-2' | 'cloud-1-3' | 'cloud-2-1' | 'cloud-2-2' | 'cloud-2-3'
export type EntityFactoriesName = 'mario' | 'goomba' | 'koopa';
export type json_File_Names = '1-1' | 'overworld' | 'Mario' | 'goomba' | 'koopa';
export type TileType = 'ground'
export type Pattern = 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'pipe-2h' | Pipe | 'cloud-single';
export type Trait_NAME = 'jump' | 'move' | 'velocity' | 'go' | 'walk' | 'pendulumMove' | 'behaviour' | 'stomper' | 'killable' | 'playerKontroller' | 'solid' | 'physics' | 'saundeffects';
export type FontName = string;
export type SpriteSheetNames = TileName | Mario | Pipe | Cloud | Goomba | Koopa | FontName;
export type Anim = (distance:number)=>SpriteSheetNames;
export type EntityFunction = (audios:SoundEffects) => Entity;

export type EntityFactories = {
    [key in EntityFactoriesName]: EntityFunction;
}

export type Tiles = {
    tiles: Array<Tile_Element>
}
export type  Pattern_Element = {
    [K in Pattern]:Tiles;
}
export type Rng = [number, number, number, number] | [number, number, number] | [number, number];

export interface Tile_Element {
    name?: SpriteSheetNames
    pattern?:Pattern
    type?: TileType
    ranges: Array<Rng>
}
export type Layer = {
    tiles: Array<Tile_Element>
}

export type Level_Entity = {
    name: EntityFactoriesName
    pos: [number, number]
}

export interface level_1_1 {
    spriteSheet: json_File_Names;
    layers: Array<Layer>
    patterns: Pattern_Element
    entities: Array<Level_Entity>
}

export type Tile_Overworld = {
    name: TileName,
    type: TileType,
    index:[number, number]
}
export type AnimationElement = {
    name:TileName | Mario
    frameLen:number
    frames:Array<TileName>
}
export interface Overworld{
    imageURL:string,
    tileW:number,
    tileH:number,
    tiles:Array<Tile_Overworld>,
    animations:Array<AnimationElement>
}

export interface MarioJSON{
    imageURL:string;
    frames:Array<{name:Mario, rect:[number, number, number, number]}>
    animations:Array<AnimationElement>
}

type KoopaAnimationElement = {
    name:Koopa
    frameLen:number
    frames:Array<Koopa>
}
export interface KoopaJSON{
    imageURL:string;
    frames:Array<{name:Koopa, rect:[number, number, number, number]}>
    animations:Array<KoopaAnimationElement>
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


// type EntityFactories = {
//     [key in EntityFactoriesName]: Function;
// } & {
//     mario: Function;
//     goomba: Function;
//     koopa: Function;
// };


//what is clss extends with super()
//https://youtu.be/W6z1uDfE9PI?t=723