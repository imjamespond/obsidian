import React, { useEffect, useRef } from 'react';

const radio = devicePixelRatio

class Rectangle {
  color
  startX
  startY
  endX
  endY
  ctx
  constructor({ color, x, y, ctx }: {
    color: any, x: number, y: number
    ctx: CanvasRenderingContext2D
  }) {
    this.color = color
    this.startX = this.endX = x
    this.startY = this.endY = y
    this.ctx = ctx
  }

  get minX() {
    return Math.min(this.startX, this.endX)
  }
  get maxX() {
    return Math.max(this.startX, this.endX)
  }
  get minY() {
    return Math.min(this.startY, this.endY)
  }
  get maxY() {
    return Math.max(this.startY, this.endY)
  }

  draw() {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.moveTo(this.minX * radio, this.minY * radio)
    ctx.lineTo(this.maxX * radio, this.minY * radio)
    ctx.lineTo(this.maxX * radio, this.maxY * radio)
    ctx.lineTo(this.minX * radio, this.maxY * radio)
    ctx.lineTo(this.minX * radio, this.minY * radio)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineCap = 'square'
    ctx.lineWidth = 3 * radio
    ctx.stroke()
  }

  isInside(x: number, y: number) {
    return x > this.minX && x < this.maxX && y > this.minY && y < this.maxY
  }
}

const shapes: Rectangle[] = []

function getShape(x: number, y: number) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i]
    if (s.isInside(x, y)) {
      return s
    }
  }
  return null
}

function FC() {
  const colorPicker = useRef<HTMLInputElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = canvas.current!
    const ctx = cvs.getContext('2d');
    if (ctx) {
      /* init */
      (() => {
        const w = 500, h = 300
        cvs.width = w * devicePixelRatio
        cvs.height = h * devicePixelRatio
        cvs.style.width = w + 'px'
        cvs.style.height = h + 'px'
        cvs.onmousedown = (e) => {
          const rect = cvs.getBoundingClientRect()
          const clickX = e.clientX - rect.left
          const clickY = e.clientY - rect.top
          const shape = getShape(clickX, clickY)
          if (shape) {
            // 拖动 
            const { startX, startY, endX, endY } = shape
            window.onmousemove = (e) => { // update pos
              dirty = true
              const dX = e.clientX - rect.left - clickX
              const dY = e.clientY - rect.top - clickY
              shape.startX = startX + dX
              shape.endX = endX + dX
              shape.startY = startY + dY
              shape.endY = endY + dY
            }
          } else {
            // 新建
            const shape = new Rectangle({
              color: colorPicker.current?.value, x: clickX, y: clickY, ctx
            })
            shapes.push(shape) // add to list
            window.onmousemove = (e) => { // update pos
              dirty = true
              shape.endX = e.clientX - rect.left
              shape.endY = e.clientY - rect.top
            }
          }
          window.onmouseup = () => {
            window.onmousemove = null
            window.onmouseup = null
          }
        }
        let last = 0
        let dirty = true
        const draw = (time: number) => {
          requestAnimationFrame(draw)
          if (/* time - last < 100 || */ dirty === false) return
          last = time
          dirty = false
          ctx.clearRect(0, 0, cvs.width, cvs.height)
          shapes.forEach(s => {
            s.draw()
          })
        }
        draw(0)
      })()
    }
  }, [])

  return (
    <div>
      <input ref={colorPicker} type='color' />
      <canvas ref={canvas} style={{ backgroundColor: '#eee' }}></canvas>
    </div>
  )
}

export default FC


