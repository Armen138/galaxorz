interface EventHandlers {
    [index:string]: Array<Function>
}
class GameObject {
    children: Array<GameObject>;
    listeners:EventHandlers; 
    x:number;
    y:number;
    constructor() {
        this.children = [];
        this.listeners = {};
    }
    on(event:string, callback:Function) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
    }
    removeListener(event:string, callback:Function) {
        let idx:number = 0;
        if(this.listeners[event]) {
            idx = this.listeners[event].indexOf(callback);
            if(idx !== -1) {
                this.listeners[event].splice(idx, 1);
            }
        }
    }
    emit(event:string, data?:any) {
        if(this.listeners[event]) {
            for(let callback of this.listeners[event]) {
                callback(data);
            }
        }
    }
    each(callback:Function) {
        for(let child of this.children) {
            callback(child);
        }
    }
    draw(context:CanvasRenderingContext2D) {
        for(let child of this.children) child.draw(context);
    }
    keyDown(key:KeyboardEvent) {
        for(let child of this.children) child.keyDown(key); 
    }
    keyUp(key:KeyboardEvent) {
        for(let child of this.children) child.keyUp(key);
    }
    click(mouse:MouseEvent) {
        for(let child of this.children) child.click(mouse);
    }
    update(delta:number) {
        for(let child of this.children) child.update(delta);
    }
    remove(gameObject:GameObject) {
        let index:number = this.children.indexOf(gameObject);
        this.children.splice(index, 1);
    }
    removeAll() {
        this.children = [];
    }
    add(gameObject:GameObject) {
        this.children.push(gameObject);
        gameObject.on("eol", () => {
            this.remove(gameObject);
        });
    }
}

export default GameObject;