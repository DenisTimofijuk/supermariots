declare type EntityFactoriesName = 'mario' | 'goomba' | 'koopa';
declare type EntityFactories = {
    [key in EntityFactoriesName]: Function;
};
export declare function loadEntities(): Promise<EntityFactories>;
export {};
