
import NavigationCard from '@/components/NavigationCard';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <div>
      <NavigationCard />
      {children}
    </div>
  )
}

export default layout