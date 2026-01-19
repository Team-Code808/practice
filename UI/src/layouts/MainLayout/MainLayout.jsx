import React from 'react';
import useStore from '../../store/useStore';
import Header from '../../components/Header';
import FooterLinks from '../../components/FooterLinks';
import * as S from './MainLayout.styles';

const MainLayout = ({ children }) => {
    const { isAdminMode } = useStore();

    return (
        <S.AppContainer $admin={isAdminMode}>
            <Header />
            <S.MainContent>
                {children}
            </S.MainContent>
            <S.Footer $admin={isAdminMode}>
                <S.FooterContent>
                    <p>© 2024 Calm Desk Admin Suite. All rights reserved.</p>
                    <FooterLinks />
                </S.FooterContent>
            </S.Footer>
        </S.AppContainer>
    );
};

export default MainLayout;
