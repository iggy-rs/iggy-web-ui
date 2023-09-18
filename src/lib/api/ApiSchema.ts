export type ApiSchema =
  | {
      method: 'GET';
      path: '/streams';
    }
  | {
      method: 'GET';
      path: `/streams/${number}`;
    }
  | {
      method: 'GET';
      path: `/streams/${number}/topics/${number}`;
    }
  | {
      method: 'GET';
      path: '/stats';
    };
