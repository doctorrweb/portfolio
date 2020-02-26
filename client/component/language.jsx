import React from 'react'
import { message, Tooltip, Divider, Button, Col } from 'antd'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { setLocale } from '../action'

message.config({
    top: 120
})

const Language = () => {

    const dispatch = useDispatch()
    const intl = useIntl()

    const ChangeLanguage = lang => {
        switch (lang) {
        case 'en':
            return (
                message.loading('Translation in progress..', 0.5)
                    .then(dispatch(setLocale('en')))
                    .then(() => message.info('Your Current Language is English', 1.3))
            )

        case 'fr':
            return (
                message.loading('Chargement de la langue..', 0.5)
                    .then(dispatch(setLocale('fr')))
                    .then(() => message.info('Votre Langue actuelle est le Français', 1.3))
            )

        case 'de':
            return (
                message.loading('Übersetzung läuft..', 0.5)
                    .then(dispatch(setLocale('de')))
                    .then(() => message.info('Ihre aktuelle Sprache ist Deutsch', 1.3))
            )

        default:
            return 'unknown language'
        }
    }

    return (
        <Col md={6} sm={0} xs={0} style={{ textAlign: 'right' }}>
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-en'})}>
                <Button onClick={() => ChangeLanguage('en')} size="small"><img src="/img/lang-en.png" width="20" /></Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-fr'})}>
                <Button onClick={() => ChangeLanguage('fr')} size="small"><img src="/img/lang-fr.png" width="20" /></Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title={intl.formatMessage({id: 'lang-de'})}>
                <Button onClick={() => ChangeLanguage('de')} size="small"><img src="/img/lang-de.png" width="20" /></Button>
            </Tooltip>
            <Divider type="vertical" />
        </Col>
    )
}

export default Language