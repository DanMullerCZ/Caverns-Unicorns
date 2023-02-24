# Caverns & Unicorns Game

## Technologies

- 🧙‍♂️ tRPC
- ⚡ React with Next.js
- ⚡ WebSocket
- ⚡ MySQL database with Prisma
- 🔐 Next-auth
- 🎨 ESLint + Prettier
- 💚 Playwright + Jest

## Setup

```bash
yarn create next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-starter-websockets trpc-prisma-starter-websockets
cd trpc-prisma-starter-websockets
yarn
yarn dx
```

## Deployment

- Deployed using OnRender
link: https://cau-dnd.onrender.com/

## Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/api/trpc/[trpc].tsx"><code>./src/api/trpc/[trpc].tsx</code></a></td>
      <td>tRPC response handler</td>
    </tr>
    <tr>
      <td><a href="./src/server/routers"><code>./src/server/routers</code></a></td>
      <td>Your app's different tRPC-routers</td>
    </tr>
  </tbody>
</table>

