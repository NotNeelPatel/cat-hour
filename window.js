class Node {
    constructor(id) {
      this.id = id;
      this.prev = null;
      this.next = null;
    }
}

const nodes = [];
for (let i = 0; i < 9; i++) {
  nodes.push(new Node(i));
}

// Link nodes: 8 -> 7 -> ... -> 0
for (let i = 8; i > 0; i--) {
  nodes[i].next = nodes[i - 1];   // Point next down the stack
  nodes[i - 1].prev = nodes[i];   // Point prev up the stack
}

// Set head and tail references
var head = nodes[8]; // Node with id 8 (top of stack)
var tail = nodes[0]; // Node with id 0 (bottom of stack)

function dragElement(elem) {
    //console.log(elem);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elem.id + "title")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elem.id + "title").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elem.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e = e;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
        elem.style.zIndex = 19;
        idx = elem.id.replace(/\D/g, '');
        const node = nodes[idx];
        if (!node || node === tail) return;

        // Remove node from current position
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (node === head) head = node.next;
      
        // Append to tail
        node.prev = tail;
        node.next = null;
        if (tail) tail.next = node;
        tail = node;
        let current = head;
        let z = 10;
        while (current) {
          const win = document.getElementById("window-" + current.id);
          win.style.zIndex = z++;
          current = current.next;
        }

    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

    }
}

