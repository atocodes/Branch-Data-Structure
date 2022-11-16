class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
    }
}

class Branch{
    constructor(){
        this.head = null
    }

    get is_empty(){
        return this.head === null
    }

    append({parent,data}){
        const node = new Node(data)
        const is_empty = this.is_empty
        console.log('Parent',parent,'Data',data)
        if(is_empty){
            console.log(`%c Got First Head \n\t\t Node Branch => ${data}`,'color : blueviolet')
            return this.head = node}
        let current = this.head

        const make_node = ({parent,new_node}) =>{
            if(parent.child){
                console.log(`%c PARENT NODE => ${parent.data}\n\tGot Additional New \n\t\t CHILD NODE => ${data}`,'color : blue')
                const s = this.search({node : parent.child})
                new_node.prev = s
                console.log(parent)
                return s.next = new_node
            }else{
                console.log(`%c PARENT NODE => ${parent.data}\n\t Got First \n\t\t CHILD NODE => ${data}`,'color : green')
                new_node.prev = parent
                console.log(parent)
                return parent.child = new_node
            }
        }
        const loop_child = ({data,node}) =>{
            let n = node
            while(n){
                if(n.data === data){
                    return n
                }else if(n.child){
                    let c = loop_child({data : data,node : n.child})
                    if(c){
                        return c
                    }
                }
                n = n.next
            }
            return false
        }

        while(current){

            if(parent){
                if(current.data === parent) return make_node({parent : current,new_node : node})
                let c_child
                if(current.child)c_child = current.child
                
                if(c_child){
                    const o = loop_child({data : parent, node : c_child})
                    if(o){
                        current = o
                        continue
                    }
                }
            }else{
                if(!current.next){
                    node.prev = current
                    console.log(`%c Branch ${node.prev.data}\n\t Got Next \n\t\t Branch => ${data}`,'color : brown')
                    return current.next = node
                }
            }

            current = current.next
        }
    }

    search({data, node,next = true}){
        let current = node

        while(current){
            // console.log(current,data)
            if(data && current.data === data) return current
            if(!data && current.next === null)return current
            if(next)current = current.next;else current = current.child
            // current = current.next
        }

        return false
    }
}

const b = new Branch()
b.append({
    data:0
})

b.append({
    data:1
})

b.append({
    parent : 1,
    data : 2
})

b.append({
    parent : 1,
    data : 3
})

b.append({
    parent : 2,
    data : 4
})

b.append({
    parent : 2,
    data : 5
})

b.append({
    parent : 2,
    data : 6
})
// // // console.warn('appending sub child')

b.append({
    parent : 3,
    data : 7
})

b.append({
    parent : 3,
    data : 8
})

// // // console.warn('appending sub child')

b.append({
    parent : 4,
    data: 9
})

b.append({
    parent : 4,
    data: 10
})

// console.warn('appending sub child')


b.append({
    parent : 5,
    data : 11
})

b.append({
    parent : 6,
    data : 12
})

b.append({
    parent : 6,
    data : 13
})
// console.error('After this line Needs a fix and it HAve to do in block code startig from line 46')
// // console.warn('appending sub child')

b.append({
    parent : 7,
    data : 14
})

b.append({
    parent : 7,
    data : 15
})

b.append({
    parent : 8,
    data : 16
})

b.append({
    parent : 8,
    data : 17
})

b.append({
    parent : 10,
    data : 18
})

b.append({
    parent : 13,
    data : 19
})
// // console.warn('appending sub child')

b.append({
    parent : 15,
    data : 20
})

b.append({
    parent : 18,
    data : 21
})

b.append({
    parent : 18,
    data : 22
})

b.append({
    parent : 19,
    data : 23
})

b.append({
    parent : 19,
    data : 24
})

// console.warn('appending sub child')

b.append({
    parent : 20,
    data : 25
})
console.log(b)