/* eslint-disable func-names */
export default function Vector(v){
    this.set(v)
}

Vector.fromNativeEvent = function(event){
    if(event.persist)
        event.persist();

    // const nativeEvent = event.nativeEvent || event

    return Vector.new(event.pageX, event.pageY)
}

Vector.prototype.set = function(v){
    this.x = v.x || 0
    this.y = v.y || 0
    return this
}
Vector.prototype.copy = function(){
    return new Vector(this)
}

Vector.prototype.isEq = function(v){
    return this.x === v.x && this.y === v.y
}

Vector.prototype.add = function(v){
    this.x += v.x
    this.y += v.y

    return this
}

Vector.prototype.sub = function(v){
    this.x -= v.x
    this.y -= v.y

    return this
}

Vector.prototype.mul = function(k){
    this.x *= k
    this.y *= k

    return this
} 

Vector.prototype.div = function(k){
    this.x /= k
    this.y /= k

    return this
} 

Vector.prototype.len = function(){
    return Math.sqrt(this.x ** 2 + this.y **2)
}

Vector.prototype.rot = function(angle){
    const {sin, cos} = Math
    // const {x, y} = this
    
    return this.set({x : this.x*cos(angle)+this.y*sin(angle), y: this.y*cos(angle)-this.x*sin(angle)})
}
Vector.prototype.rotated = function(angle){
    return new Vector(this).rot(angle)
}
Vector.prototype.sum = function(v){
    return new Vector(this).add(v)
}

Vector.prototype.dif = function(v){
    return new Vector(this).sub(v)
}

Vector.prototype.mult = function(k){
    return new Vector(this).mul(k)
}
Vector.prototype.divided = function(k){
    return new Vector(this).div(k)
}


Vector.new = function(x,y){
    return new Vector({x, y})
}