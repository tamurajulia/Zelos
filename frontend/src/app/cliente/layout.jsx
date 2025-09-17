import NavClient from '@/components/Navbar/NavClient'
import Footer from '@/components/Footer/Footer'
import RotaProtegida from '@/components/Protecaorota/ProtecaoRota'


export default function ClientLayout({ children }) {
    return (
        <>
            <RotaProtegida permitido={['usuario']}>
                
                   
                        <NavClient />
                        {children}
                        <Footer />
                
              
            </RotaProtegida>
        </>
    )
}