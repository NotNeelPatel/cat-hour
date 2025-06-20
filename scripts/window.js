// Linked list node for the window stack
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

// Link nodes
for (let i = 8; i > 0; i--) {
  nodes[i].next = nodes[i - 1];
  nodes[i - 1].prev = nodes[i]; 
}

// Set head and tail references, 
// id 8 is the top
var head = nodes[8];
// id 0 is at the bottom
var tail = nodes[0];

// Heavily based on https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elem) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elem.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position
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
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
    }
}


function alignImages(){
  var totalWidth = 40;
  var currentHeight = 0;
  var maxHeight = 0;
  for(let i = 0; i < 9; i++){
    const card = document.getElementById("window-" + i);
    if (i % 3 == 0) {
      totalWidth = 0;
      currentHeight += maxHeight;
    }
    if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
    card.style.transition = "ease-in 0.3s";
    card.style.left = (400 + totalWidth)*1.1 + ("px");
    card.style.top = (40 + currentHeight)*1.05 + ("px");
    totalWidth += card.offsetWidth;
    card.style.transition = "0s";
  }
    
}

