type EventTypes =
    "login"
    | "register"
    | "logout"
    | "envChange"

type EventCallback<T = any> = (payload: T) => void;

type SubscriberEntry<T = any> = {
    name: string;
    callback: EventCallback<T>;
};

const subscribers: Record<EventTypes, SubscriberEntry[]> = {
    login: [],
    register: [],
    logout: [],
    envChange: [],
};

export const subscribe = <T = any>(
    event: EventTypes,
    name: string,
    cb: EventCallback<T>
) => {
    subscribers[event].push({ name, callback: cb });
};

export const unsubscribe = (
    event: EventTypes,
    name: string
) => {
    subscribers[event] = subscribers[event].filter(s => s.name !== name);
};

export const emit = <T = any>(
    event: EventTypes,
    payload: T
) => {
    console.log(`[EventBus] Emitting "${event}" to:`, subscribers[event].map(s => s.name));
    subscribers[event].forEach(s => s.callback(payload));
};