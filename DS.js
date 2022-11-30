class Node {
    constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}

class Branch {
    constructor() {
        this.head = null
    }

    get is_empty() {
        return this.head === null
    }

    append({ parent, data }) {
        const node = new Node(data)
        if (this.is_empty) {
            node.prev = this.head
            return this.head = node
        }

        if (parent) {
            const search = this.search(parent)
            node.prev = search

            if (!search.child) {
                return search.child = node
            }

            let current = search.child
            while (current) {
                if (current.next === null) {
                    node.prev = current
                    return current.next = node
                }
                current = current.next
            }
            return
        }

        let current = this.head

        while (current) {
            if (current.next === null) {
                node.prev = current
                return current.next = node
            }
            current = current.next
        }
    }

    search(data) {
        let current = this.head
        let tmp
        while (current) {
            // console.log(current)
            if (current.data === data) {
                return current
            } else if (current.child) {
                // console.log(Boolean(n.next))

                tmp = current
                current = current.child

                if (Boolean(current.next)) {
                    let n = current
                    console.log(n.next === null)
                    while (n) {
                        // console.log(n,'NExt')
                        if (n.data === data) {
                            return n
                        }
                        n = n.next
                    }
                }
                continue

            } else if (!current.next) {
                current = tmp
                continue
            }
            current = current.next
        }

        return false
    }
}

const b = new Branch()
b.append({ data: 'Root' })
b.append({
    data: 'CS Development'
})
b.append({
    parent: 'CS Development',
    data: 'PHD Stud'
})
b.append({
    parent: 'CS Development',
    data: 'Professors'
})
b.append({
    parent: 'PHD Stud',
    data: 'Stud1'
})
b.append({
    parent: 'PHD Stud',
    data: 'Stud2'
})
b.append({
    parent: 'PHD Stud',
    data: 'Stud3'
})
b.append({
    parent: 'Stud1',
    data: 'Name'
})
b.append({
    parent: 'Stud1',
    data: 'Papers'
})
b.append({
    parent: 'Papers',
    data: 'pap1'
})
b.append({
    parent: 'pap1',
    data: 'Title'
})
b.append({
    parent: 'pap1',
    data: 'Author'
})
b.append({
    parent: 'Stud2',
    data: 'name'
})

b.append({
    parent: 'Stud3',
    data: 'name1'
})

b.append({
    parent: 'Stud3',
    data: 'pap2'
})
console.log('searching stud3')
const s = b.search('Stud3')
console.log(s)
console.log(b)