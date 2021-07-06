/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    BackHandler,
    Button,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
} from 'react-native'
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import {
    NavigationContainer,
    RouteProp,
    ParamListBase,
    NavigatorScreenParams,
    CompositeNavigationProp,
    useFocusEffect,
    useNavigation,
    StackNavigationState,
} from '@react-navigation/native'
import {
    createStackNavigator,
    StackNavigationProp,
    StackScreenProps,
    StackNavigationOptions,
    HeaderBackButton,
    StackHeaderTitleProps,
} from '@react-navigation/stack'
import { createBottomTabNavigator, BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

const Section: React.FC<{ title: string }> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark'
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    )
}

function HomeScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'Home'>) {
    React.useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
            // Alert.alert(route.params?.post)
        }
    }, [route.params?.post])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() =>
                    navigation.navigate('Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    })
                }
            />
            <Button title="Create post" onPress={() => navigation.navigate('CreatePost')} />
            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        </View>
    )
}

function DetailsScreen({ navigation, route }: StackScreenProps<RootStackParamList, 'Details'>) {
    const { itemId, otherParam } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button title="Go to Demo3" onPress={() => navigation.navigate('Demo3')} />
            <Button
                title="Go to Details... again"
                onPress={() =>
                    navigation.push('Details', { itemId: Math.floor(Math.random() * 100), otherParam: undefined })
                }
            />
            <Button
                title="Change itemId"
                onPress={() => {
                    navigation.setParams({
                        itemId: Math.floor(Math.random() * 100),
                    })
                }}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
        </View>
    )
}

function Demo3Screen({ navigation }: StackScreenProps<RootStackParamList, 'Demo3'>) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Demo3 Screen</Text>
            <Button title="Go to Demo4" onPress={() => navigation.navigate('Demo4')} />
            <Button title="Go to Demo5" onPress={() => navigation.navigate('Demo5', { title: '' })} />
            <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} />
        </View>
    )
}

// 范型写 ParamListBase，avigation.navigate('Details') 没有类型检查
function Demo4Screen({ navigation }: StackScreenProps<ParamListBase>) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Demo4 Screen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
            <Section title="Learn More">Read the docs to discover what to do next:</Section>
        </View>
    )
}

type Demo5ScreenProps = StackScreenProps<RootStackParamList, 'Demo5'>

function Demo5Screen({ navigation, route }: Demo5ScreenProps) {
    const [value, onChangeText] = React.useState(route.params.title)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
            headerRight: () => (
                <TouchableOpacity onPress={() => Alert.alert('This is a button!')}>
                    <Text>Done</Text>
                </TouchableOpacity>
            ),
        })
    }, [navigation, value])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={onChangeText}
                value={value}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )

    const onClickDone = () => {
        Alert.alert('Done Click!')
    }
}

function CreatePostScreen({ navigation, route }: StackScreenProps<ParamListBase>) {
    const [postText, setPostText] = React.useState('')

    return (
        <>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate({
                        name: 'Home',
                        params: { post: postText },
                    })
                }}
            />
        </>
    )
}

function ProfileScreen({ route, navigation }: ProfileScreenProps) {
    const { userId } = route.params
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
    )
}

type RootStackParamList = {
    Home: { post: string } | undefined
    Details: { itemId: number; otherParam: string | undefined }
    Profile: { userId: string; name: string }
    Demo3: undefined
    Demo4: undefined
    Demo5: { title: string }
    CreatePost: undefined
}
/**
 * Stack
 * 方法一：Stack.Screen 的每一个路由的名称，都必须先在 RootStackParamList 注册
 */
// const Stack = createStackNavigator<RootStackParamList>()
/**
 * Stack
 * 方法二：
 */
const Stack = createStackNavigator()

/**
 * ProfileScreenProps
 * 方法一：
 */
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>
type ProfileScreenProps = {
    navigation: ProfileScreenNavigationProp
    route: ProfileScreenRouteProp
}
/**
 * ProfileScreenProps
 * 方法二：
 */
// type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>

type TabParamList = {
    Home: NavigatorScreenParams<RootStackParamList>
    Profile: { userId: string }
}

// type ProfileScreenNavigationProp = CompositeNavigationProp<
//     BottomTabNavigationProp<TabParamList, 'Profile'>,
//     StackNavigationProp<RootStackParamList>
// >

// type ProfileScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamList, 'Profile'>,
//   CompositeNavigationProp<
//     StackNavigationProp<RootStackParamList>,
//     DrawerNavigationProp<DrawerParamList>
//   >
// >

function LogoTitle(props: StackHeaderTitleProps) {
    return <Text>自定义标题</Text>
    // return <Image style={{ width: 50, height: 50 }} source={require('@expo/snack-static/react-native-logo.png')} />
}

const App = () => {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    // screenOptions，共享选项，该Stack下全局生效
                    title: '全局标题',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitleVisible: false,
                    // headerBackTitle: 'back',
                    // headerTruncatedBackTitle: '', //当 headerBackTitle 不适合屏幕时后退按钮使用的标题字符串。 默认为“返回”。
                    headerBackImage: props => (
                        <View style={{ width: 44, height: 44, justifyContent: 'center' }}>
                            <Text style={{ paddingLeft: 15, color: 'white' }}>{'<<'}</Text>
                        </View>
                    ),
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: 'Details Page' }}
                    initialParams={{ itemId: 42 }}
                />
                <Stack.Screen
                    name="Demo3"
                    component={Demo3Screen}
                    options={{
                        title: 'Demo3标题',
                    }}
                />
                <Stack.Screen
                    name="Demo4"
                    component={Demo4Screen}
                    options={{ headerTitle: (props: StackHeaderTitleProps) => <LogoTitle {...props} /> }}
                />
                <Stack.Screen name="Demo5" component={Demo5Screen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: '创建帖子' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default App
