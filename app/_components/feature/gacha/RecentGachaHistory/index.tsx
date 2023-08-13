// ドメインレベルの_componentsでの利用は控えるべきかも
// あとで考える

'use client'

type Props = {}

export const RecentGachaHistory = ({}: Props) => {
  fetch("/user")
    .then((res) => res.json())
    .then(console.log);
  return <div>aaa</div>
};
