declare global {
  namespace Toast {
    type Options = {
      msg: string;
      type: 'notice' | 'error';
    };
    type Item = Options & {
      id: string;
    };
  }
}
export {};
