import React from 'react';
import {InfoContentItem} from './InfoContentItem';
import {calculateAgeInWeeks} from '../../common/helpers/helpers';
import {
    MdFace
} from 'react-icons/md';
import {
    GoCalendar,
    GoHeart
} from 'react-icons/go';
import {ChildImage} from './ChildImage';
import {scrollPageToBottom} from '../utility/utility';

export class InfoComponent extends React.Component {
    componentDidMount() {
        scrollPageToBottom();
    }
    render() {
        const {
            childName,
            birthdate,
            imageUrl
        } = this.props;
        const ageInWeeks = calculateAgeInWeeks(birthdate);

        return (
            <div className="info-wrapper">
                <InfoContentItem
                    icon={<MdFace size={24}/>}
                    propName="Child name"
                    propValue={childName}
                />
                <InfoContentItem
                    icon={<GoHeart size={24}/>}
                    propName="Birthdate"
                    propValue={birthdate}
                />
                <InfoContentItem
                    icon={<GoCalendar size={24}/>}
                    propName="Age in weeks"
                    propValue={ageInWeeks.toString()}
                />
                {imageUrl ? <ChildImage imageUrl={imageUrl}/> : null}
            </div>
        );
    }
}