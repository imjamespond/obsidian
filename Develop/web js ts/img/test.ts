import html2canvas from 'html2canvas'

export function screenshot() {
  const div = document.querySelector<HTMLElement>('body')
  div && html2canvas(div, {}).then(canvas => {
    const ctx = canvas.getContext('2d')
    const all: Promise<void>[] = []
    if (ctx) {
      document.querySelectorAll('iframe').forEach((iframe) => {
        const body = (iframe.contentDocument)?.querySelector('body')
        if (body) {
          const done = new Promise<void>((reso)=>{
            html2canvas(body, {}).then(canvas => {
              const { width, height, top, left } = iframe.getBoundingClientRect()
              // console.log('html2canvas', JSON.stringify({ width, height, top, left }), canvas.width, canvas.height)
              const img = new Image()
              img.src = canvas.toDataURL("image/png")
              img.onload = () => {
                ctx.drawImage(img, left, top, width, height)
                reso()
              }
            });
          })
          all.push(done)
        }
      })
    }

    Promise.all(all).then(() => {
      // document.body.appendChild(canvas)
      // canvas.setAttribute('style', "z-index:99;")

      const link = document.createElement('a')
      link.href = canvas.toDataURL("image/png")
      link.download = 'screenshot'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

  });

}