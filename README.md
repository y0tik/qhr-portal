### Pages

```jsx
<Routes>
  <Route file="root.tsx">
    <Route index file="routes/_index.tsx" />
    <Route path="login" file="routes/login.tsx" />
    <Route file="routes/_alumni+/_layout.tsx">
      <Route path="company/news" file="routes/_alumni+/company.news.tsx" />
      <Route
        path="documents/:category"
        file="routes/_alumni+/documents.$category.tsx"
      />
      <Route
        path="documents/"
        index
        file="routes/_alumni+/documents._index.tsx"
      />
      <Route path="me" file="routes/_alumni+/me.tsx" />
      <Route path="settings" file="routes/_alumni+/settings.tsx" />
    </Route>
    <Route file="routes/_users+/_layout.tsx">
      <Route path="alumni/" index file="routes/_users+/alumni+/_index.tsx" />
      <Route path="alumni/bulk" file="routes/_users+/alumni+/bulk.tsx" />
      <Route path="alumni/create" file="routes/_users+/alumni+/create.tsx" />
      <Route
        path="alumni/update/:id"
        file="routes/_users+/alumni+/update.$id.tsx"
      />
      <Route path="overview" file="routes/_users+/overview/route.tsx" />
      <Route path="settings" file="routes/_users+/settings.tsx" />
      <Route path="ticket/" index file="routes/_users+/ticket+/_index.tsx" />
      <Route path="ticket/create" file="routes/_users+/ticket+/create.tsx" />
      <Route path="ticket/update" file="routes/_users+/ticket+/update.tsx" />
      <Route path="user/" index file="routes/_users+/user+/_index.tsx" />
      <Route path="user/bulk" file="routes/_users+/user+/bulk.tsx" />
      <Route path="user/create" file="routes/_users+/user+/create.tsx" />
      <Route
        path="user/update/:id"
        file="routes/_users+/user+/update.$id.tsx"
      />
    </Route>
    <Route
      path="action/alumni/delete/:id"
      file="routes/action+/alumni.delete.$id.tsx"
    />
    <Route path="action/signout" file="routes/action+/signout.tsx" />
    <Route
      path="action/user/delete/:id"
      file="routes/action+/user.delete.$id.tsx"
    />
  </Route>
</Routes>
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
