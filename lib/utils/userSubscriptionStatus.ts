export interface SubscriptionStatus {
  active: boolean
  plan: string
  id: string
}

// TODO better typing
const userSubscriptionStatus = (user?: any): SubscriptionStatus => {
  if (!user) return { active: false, plan: '', id: '' }
  return {
    // @ts-ignore
    active:
      user?.publicMetadata?.subscription?.status === 'active' ||
      user?.publicMetadata?.subscription?.status === 'cancelled',
    // @ts-ignore
    plan: user?.publicMetadata?.subscription?.productName,
    // @ts-ignore
    id: user?.publicMetadata?.subscription?.subscriptionId
  }
}

export default userSubscriptionStatus
