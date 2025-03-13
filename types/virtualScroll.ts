import type {Ref} from "vue";
import type { Fruit } from "./fruit";

export interface VirtualScrollProps {
    items: Fruit[];
    itemHeight: number;
    containerHeight: number;
    buffer?: number;
}

export interface VirtualScrollReturn {
    containerRef: Ref<HTMLElement | null>;
    visibleItems: Ref<Fruit[]>;
    totalHeight: Ref<number>;
    offsetY: Ref<number>;
    resetScroll: () => void;
    scrollState: Ref<ScrollState>;
}

export interface ScrollState {
    startIndex: number;
    endIndex: number;
    offsetY: number;
    totalHeight: number;
    visibleCount: number;
}