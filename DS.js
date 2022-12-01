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

        if(is_empty)return this.head = node

        let current = this.head
        while(current){

            if(parent){
                // console.log(current,'current')
                // console.log(current)
                if(current.data === parent){
                    if(current.child){
                        console.log('\n')
                        console.log(`%c PARENT NODE => ${current.data}\n\tGot Additional New \n\t\t CHILD NODE => ${data}`,'color : blue')
                        
                        current = this.search({
                            node :current.child
                        })
                        return current.next = node
                    }else{
                        console.log('\n')
                        console.log(`%c PARENT NODE => ${current.data}\n\t Got First \n\t\t CHILD NODE => ${data}`,'color : green')
                        
                        node.prev = current
                        return current.child = node
                    }
                }else if (current.child){
                    // !Over this block is where it needs some thinking
                    let child = current.child
                    
                    console.log(child)
                    const search = this.search({data : parent,node : child})
                    if(!search){
                        // console.log(current.child)
                        current = child
                        continue
                    }
                    current = search
                    node.prev = search
                    continue
                    return search.next = node
                }
            }

            if(!current.next){
                node.prev = current
                return current.next = node
            }
            current = current.next
        }
    }

    search({data, node}){
        let current = node

        while(current){
            // console.log(current,data)
            if(data && current.data === data) return current
            if(!data && current.next === null)return current
            current = current.next
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
// console.warn('appending sub child')

b.append({
    parent : 3,
    data : 7
})

b.append({
    parent : 3,
    data : 8
})

// console.warn('appending sub child')

b.append({
    parent : 4,
    data: 9
})

b.append({
    parent : 4,
    data: 10
})

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
console.error('After this line Needs a fix and it HAve to do in block code startig from line 46')
// console.warn('appending sub child')

b.append({
    parent : 7,
    data : 14
})

// b.append({
//     parent : 7,
//     data : 15
// })

// b.append({
//     parent : 8,
//     data : 16
// })

// b.append({
//     parent : 8,
//     data : 17
// })

// b.append({
//     parent : 10,
//     data : 18
// })

// b.append({
//     parent : 13,
//     data : 19
// })
// // console.warn('appending sub child')

// b.append({
//     parent : 15,
//     data : 20
// })

// b.append({
//     parent : 18,
//     data : 21
// })

// b.append({
//     parent : 18,
//     data : 22
// })

// b.append({
//     parent : 19,
//     data : 23
// })

// b.append({
//     parent : 19,
//     data : 24
// })

// console.warn('appending sub child')

// b.append({
//     parent : 20,
//     data : 25
// })
console.log(b)