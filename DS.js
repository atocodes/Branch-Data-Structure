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
            console.log(`%c Got First Head \n\t\t Node Branch => ${data} : SUCCESS ✔`,'color : blueviolet')
            return this.head = node}
        let current = this.head

        const path_viewer = (branch) =>{
            let path = branch
            let arr = []

            while(path){
                arr.push(path.data)
                path = path.prev
            }
            arr.reverse()
            arr = arr.map((node,index) =>{
                if(node === branch.data){
                    return `=> ${node.toUpperCase()}`
                }
                if(index > 0){
                    return `-> ${node.toUpperCase()}`
                }
                return node.toUpperCase()
            })
            arr = arr.join('')
            return arr
        }

        const make_node = ({parent,new_node}) =>{
            
            if(parent.child){
                const s = this.search({node : parent.child})
                new_node.prev = s

                // * CONSOLE VIEW
                console.log(`%c PARENT NODE => ${parent.data}\n\tGot Additional New \n\t\t CHILD NODE => ${data} : SUCCESS ✔`,'color : blue')
                const p = path_viewer(new_node)
                console.log(`%cPATH: ${p}`,'color:gray')
                console.log(parent)
                // *===

                return s.next = new_node
            }else{
                new_node.prev = parent

                // * CONSOLE VIEW
                console.log(`%c PARENT NODE => ${parent.data}\n\t Got First \n\t\t CHILD NODE => ${data} : SUCCESS ✔`,'color : green')
                const p = path_viewer(new_node)
                console.log(`%cPATH: ${p}`,'color:gray')
                console.log(parent)
                // *===

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

                    // * CONSOLE VIEW
                    console.log(`%c Branch ${node.prev.data}\n\t Got Next \n\t\t Branch => ${data} : SUCCESS ✔`,'color : brown')
                    const p = path_viewer(node)
                    console.log(`%cPATH: ${p}`,'color:gray')
                    console.log(current)
                    // *===

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
b.append({data:'root'})
b.append({data:'cs'})

// ? CS
b.append({parent:'cs',data:'phd'})
b.append({parent:'cs',data:'pro'})

// ? CS -> PHD
b.append({parent:'phd',data:'stud1'})
b.append({parent:'phd',data:'stud2'})
b.append({parent:'phd',data:'stud3'})

// ? CS -> PHD -> STUD1
b.append({parent:'stud1',data:'name1'})
b.append({parent:'stud1',data:'paper1'})

// ? CS -> PHD -> STUD1 -> PAPER1
b.append({parent:'paper1',data:'paper11'})

// ? CS -> PHD -> STUD1 -> PAPER1 -> title
b.append({parent:'paper11',data:'title'})

// ? CS -> PHD -> STUD1 -> PAPER1 -> author
b.append({parent:'paper11',data:'author'})

// ? CS -> PHD -> STUD2 -> NAME2
b.append({parent:'stud2',data:'name2'})

// ? CS -> PHD -> STUD3 -> NAME3
b.append({parent:'stud3',data:'name3'})

// ? CS -> PHD -> STUD3 -> PAPER2
b.append({parent:'stud3',data:'paper2'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3
b.append({parent:'paper2',data:'paper3'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4
b.append({parent:'paper3',data:'paper4'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4 -> Title
b.append({parent:'paper4',data:'title1'})

// ? CS -> PHD -> STUD3 -> PAPER2 -> PAPER3 -> PAPER4 -> Title
b.append({parent:'paper4',data:'author'})



// ? CS -> PRO -> PRO1
b.append({parent:'pro',data:'pro1'})

// ? CS -> PRO -> PRO2
b.append({parent:'pro',data:'pro2'})

// ? CS -> PRO -> PRO1 -> NAME01
b.append({parent:'pro1',data:'name01'})

// ? CS -> PRO -> PRO1 -> PAPER01
b.append({parent:'pro1',data:'paper01'})

// ? CS -> PRO -> PRO1 -> PAPER01 -> PAPER002
b.append({parent:'paper01',data:'paper002'})

// ? CS -> PRO -> PRO1 -> PAPER01 -> PAPER002 -> TITLE01
b.append({parent:'paper002',data:'title01'})

// ? CS -> PRO -> PRO2 -> NAME02
b.append({parent:'pro2',data:'name02'})

// ? CS -> PRO -> PRO2 -> PAPER02
b.append({parent:'pro2',data:'paper02'})

console.log(b)