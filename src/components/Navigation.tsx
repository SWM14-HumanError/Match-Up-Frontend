import {Link} from "react-router-dom";

interface INav {
    isLogin: boolean,
}
function Navigation({isLogin}: INav) {
    return (
        <div>
            <nav>
                <div>
                    <img src="" alt=""/>
                    <Link to='/'>프로젝트</Link>
                    <Link to='/'>팀원</Link>
                    <Link to='/'>멘토</Link>
                    <Link to='/'>피드</Link>
                </div>
                {isLogin ? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <Link to='/'>로그인 / 가입</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navigation;