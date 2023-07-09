// ドメインレベルの_componentsでの利用は控えるべきかも
// あとで考える

'use client'

type Props = {}

export const {{ inputs.component | pascal }} = ({}: Props) => {
  fetch("/user")
    .then((res) => res.json())
    .then(console.log);
  return <div>aaa</div>
};
