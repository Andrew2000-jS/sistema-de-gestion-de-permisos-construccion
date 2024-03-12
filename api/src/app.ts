import 'reflect-metadata'
import server from './server'

const PORT = 3001

function main (): void {
  server.listen(PORT)
  console.log(`Server on port ${PORT}`)
}

main()
