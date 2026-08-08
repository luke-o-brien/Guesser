import Classes from './operatorBadge.module.scss'


export const OperatorBadge = ({ operator }: { operator: string }) => {
  return (
    <div className={Classes.Badge} style={{backgroundColor: `var(--${operator})`}}>
      <p className={Classes.BadgeText}>{operator}</p>
    </div>
  )
}