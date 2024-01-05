```ts

/**
 * 计算更新节点所有相关的edges在节点左右哪一侧
 * @param this 
 * @param node 
 */
export function update_ports(this: Graph, node?: Node) {
  if (this.graph === undefined) {
    throw 'graph is undefined'
  }
  const graph = this.graph

  const updateOutgoing = (snode: Node) => {
    const sEdges = graph.getOutgoingEdges(snode.id);
    sEdges?.forEach((edge) => {
      const tnode = edge.getTargetNode()
      if (tnode) {
        updateST(edge, snode, tnode)
      }
    })
  }
  const updateIncoming = (tnode: Node) => {
    const sEdges = graph.getIncomingEdges(tnode.id);
    sEdges?.forEach((edge) => {
      const snode = edge.getSourceNode()
      if (snode) {
        updateST(edge, snode, tnode)
      }
    })
  }

  const updateST = (edge: Edge, snode: Node, tnode: Node) => {

    const sbox = snode.getBBox()
    const tbox = tnode.getBBox()
    let sg = 'right', tg = 'right'
    if ((sbox.left - 1) > tbox.right) { // source is on the right
      sg = 'left'
    }
    if ((sbox.right + 1) < tbox.left) { // source is on the left
      tg = 'left'
    }
    if ((sbox.bottom + 100) < tbox.top) { // source is on the left
      tg = 'top'
    }
    if ((tbox.bottom + 100) < sbox.top) { // source is on the left
      sg = 'top'
    }
    edge.setSource(snode)
    edge.setTarget(tnode)
    const sp = getPortId(edge.id)
    snode.removePort(sp)
    snode.addPort({
      id: sp,
      group: sg
    })
    const tp = getPortId(edge.id)
    tnode.removePort(tp)
    tnode.addPort({
      id: tp,
      group: tg
    })
    edge.setSource(snode, { port: sp })
    edge.setTarget(tnode, { port: tp })
  }

  if (node) {
    updateOutgoing(node)
    updateIncoming(node)
  } else {
    graph.getNodes().forEach((node) => {
      updateOutgoing(node)
    })
  }

}
```